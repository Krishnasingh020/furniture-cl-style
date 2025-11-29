// backend/server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

// ==== 1) MongoDB connection ====
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kalium_furniture'; // <- change DB name if needed

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('[DB] Connected to MongoDB at', MONGO_URI);
  })
  .catch(err => {
    console.error('[DB] MongoDB connection error:', err.message);
  });

// ==== 2) API routes ====
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const subcategoryRoutes = require('./routes/subcategories');

// Health check used by api-client.js
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);

// ==== 3) Serve frontend static files ====
const FRONTEND_ROOT = path.join(__dirname, '..', 'frontend');
// Moved express.static to the end to allow HTML rewriting

// ==== 4) Rewrite HTML links from original site ====
function rewriteHtml(html) {
  html = html.replace(
    /https:\/\/sites\.kaliumtheme\.com\/elementor\/furniture\/product\/([a-zA-Z0-9\-]+)\/?/g,
    (m, slug) => {
      console.log('[Rewrite] Product:', slug);
      return `/product/${slug}`;
    }
  );

  // NEW: Rewrite existing relative links (e.g. /index_tact-mirror.html -> /product/tact-mirror)
  html = html.replace(
    /\/index_([a-zA-Z0-9\-]+)\.html/g,
    (m, slug) => {
      // Exclude known non-product pages
      const nonProductSlugs = ['decor', 'mirrors', 'rugs'];

      if (nonProductSlugs.includes(slug)) {
        return m; // Keep category pages as is
      }

      console.log('[Rewrite] Relative Product:', slug);
      return `/product/${slug}`;
    }
  );

  // REWRITE: /product-category/slug -> /category/slug
  html = html.replace(
    /https:\/\/sites\.kaliumtheme\.com\/elementor\/furniture\/product-category\/([a-zA-Z0-9\-\/]+)\/?/g,
    (m, slug) => {
      console.log('[Rewrite] Category Match:', slug);
      // slug might be "decor" or "decor/mirrors"
      // For now, just take the last part or the whole thing?
      // The original code took the first part. Let's stick to that but map to /category/
      const parts = slug.split('/').filter(Boolean);
      const categorySlug = parts[parts.length - 1];
      console.log('[Rewrite] Category Match:', slug, '->', categorySlug);
      return `/index_decor/category/${categorySlug}`;
    }
  );

  // REMOVED: Aggressive rewrite of base URL breaks assets because they are not downloaded locally.
  // html = html.replace(
  //   /https:\/\/sites\.kaliumtheme\.com\/elementor\/furniture\//g,
  //   '/'
  // );

  html = html.replace(
    /onclick="window\.location\.href=this\.href; return false;"/g,
    ''
  );

  // REWRITE: /wp-content/ -> https://sites.kaliumtheme.com/elementor/furniture/wp-content/
  // This fixes broken assets on pages that use local absolute paths (like index_mirrors.html)
  html = html.replace(
    /["']\/wp-content\/([^"']+)["']/g,
    (m, path) => {
      // console.log('[Rewrite] wp-content:', path);
      return `"https://sites.kaliumtheme.com/elementor/furniture/wp-content/${path}"`;
    }
  );

  // REWRITE: /wp-includes/ -> https://sites.kaliumtheme.com/elementor/furniture/wp-includes/
  html = html.replace(
    /["']\/wp-includes\/([^"']+)["']/g,
    (m, path) => {
      return `"https://sites.kaliumtheme.com/elementor/furniture/wp-includes/${path}"`;
    }
  );

  return html;
}

// ==== 5) Serve HTML pages ====

// NEW: Handle /product/:slug
app.get('/product/:slug', (req, res) => {
  const slug = req.params.slug;
  console.log('[Server] Product request:', slug);

  // Try to find a specific file for this product (legacy support)
  // e.g. tact-mirror -> index_tact-mirror.html
  let filename = `index_${slug}.html`;
  let filePath = path.join(FRONTEND_ROOT, filename);

  if (!fs.existsSync(filePath)) {
    // Fallback to index_tact-mirror.html as the app shell for products
    // This ensures we load the PRODUCT PAGE template, not the category template
    console.log(`[Server] Specific file ${filename} not found, serving index_tact-mirror.html as template`);
    filePath = path.join(FRONTEND_ROOT, 'index_tact-mirror.html');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('[Product] Error reading file:', filePath, err);
      return res.status(404).send('Not found');
    }
    const output = rewriteHtml(data);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(output);
  });
});

// NEW: Handle /category/:slug
app.get('/category/:slug', (req, res) => {
  serveCategoryPage(req, res);
});

// NEW: Support /index_decor/category/:slug as requested
app.get('/index_decor/category/:slug', (req, res) => {
  serveCategoryPage(req, res);
});

function serveCategoryPage(req, res) {
  const slug = req.params.slug;
  // Map slug to specific file if needed, or default to index_decor.html which seems to be the main template
  // The user wants "index_decor/category/living" style too, but standard /category/:slug is cleaner.
  // We will serve index_decor.html for all categories and let api-client.js fetch the right data.

  let filename = `index_${slug}.html`;
  let filePath = path.join(FRONTEND_ROOT, filename);

  if (!fs.existsSync(filePath)) {
    // Fallback to index_decor.html as the generic category template
    console.log(`[Server] Specific category file ${filename} not found, serving index_decor.html`);
    filename = 'index_decor.html';
    filePath = path.join(FRONTEND_ROOT, filename);
  }

  if (!fs.existsSync(filePath)) {
    console.log(`[Server] ${filename} not found, falling back to index.html`);
    filePath = path.join(FRONTEND_ROOT, 'index.html');
  }

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('[Category] Error reading file:', filePath, err);
      return res.status(404).send('Not found');
    }

    const output = rewriteHtml(data);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(output);
  });
}

// Serve specific HTML files (legacy or direct access) and root
app.get(['/*.html', '/'], (req, res) => {
  let reqPath = req.path;
  if (reqPath === '/') reqPath = '/index.html';

  const filePath = path.join(FRONTEND_ROOT, reqPath);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('[HTML] Not found:', filePath, 'Falling back to index_decor.html');
      // Fallback to index_decor.html for dynamic product pages
      const fallbackPath = path.join(FRONTEND_ROOT, 'index_decor.html');
      fs.readFile(fallbackPath, 'utf8', (err2, data2) => {
        if (err2) {
          console.error('[HTML] Fallback not found:', fallbackPath);
          return res.status(404).send('Not found');
        }
        const output = rewriteHtml(data2);
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.send(output);
      });
      return;
    }

    const output = rewriteHtml(data);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(output);
  });
});

// Serve static files (CSS, JS, Images) - placed after HTML routes to allow rewriting
app.use(express.static(FRONTEND_ROOT, { index: false }));

// ==== 6) Start server ====
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Serving frontend from: ${FRONTEND_ROOT}`);
});
