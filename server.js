const express = require('express');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
// OPTIONAL (for later when you hook up DB):
// const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 8000;

// FOLDERS
const FRONTEND_ROOT = path.join(__dirname, 'kalium_furniture', 'frontend');
const BACKEND_ROOT = path.join(__dirname, 'kalium_furniture', 'backend');

// =====================
// 1) DB CONNECT
// =====================
// Connect to MongoDB Atlas if MONGODB_URI is provided, otherwise fallback to local
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kalium_furniture';

const mongoose = require('mongoose');
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// =====================
// 2) API ROUTES
// =====================
// These should use the files you have in backend/routes/*.js
// Example expected paths:
//   backend/routes/products.js
//   backend/routes/categories.js
//   backend/routes/subcategories.js

app.use('/api/products', require(path.join(BACKEND_ROOT, 'routes', 'products')));
app.use('/api/categories', require(path.join(BACKEND_ROOT, 'routes', 'categories')));
app.use('/api/subcategories', require(path.join(BACKEND_ROOT, 'routes', 'subcategories')));

// =====================
// 3) FRONTEND: static files
// =====================
// Serve CSS, JS, images, etc. from /frontend.
// We disable the default index so we can control HTML serving manually.

app.use(express.static(FRONTEND_ROOT, { index: false }));

// Helper: rewrite HTML content replacing absolute original URLs with local equivalents
function rewriteHtml(html) {
  // 1) product pages -> index_<slug>.html
  html = html.replace(
    /https:\/\/sites\.kaliumtheme\.com\/elementor\/furniture\/product\/([a-zA-Z0-9\-]+)\/?/g,
    (m, slug) => `/${'index_' + slug + '.html'}`
  );

  // 2) category links -> index_<slug>.html
  html = html.replace(
    /https:\/\/sites\.kaliumtheme\.com\/elementor\/furniture\/product-category\/([a-zA-Z0-9\-\/]+)\/?/g,
    (m, slug) => {
      const first = slug.split('/')[0]; // if nested categories present
      return `/${'index_' + first + '.html'}`;
    }
  );

  // 3) site root URLs -> local root
  html = html.replace(
    /https:\/\/sites\.kaliumtheme\.com\/elementor\/furniture\//g,
    '/'
  );

  // 4) remove inline onclick that forces external navigation
  html = html.replace(
    /onclick="window\.location\.href=this\.href; return false;"/g,
    ''
  );

  return html;
}

// =====================
// 4) FRONTEND: HTML routes
// =====================
// For any HTML request, read file from /frontend, run rewrite, send back.

app.get(['/*.html', '/'], (req, res) => {
  let reqPath = req.path;

  // default page -> your main category (decor for now)
  if (reqPath === '/') reqPath = '/index_decor.html';

  const filePath = path.join(FRONTEND_ROOT, reqPath);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('HTML file not found:', filePath);
      res.status(404).send('Not found');
      return;
    }

    const out = rewriteHtml(data);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(out);
  });
});

// =====================
// 5) START SERVER
// =====================

app.listen(PORT, () => {
  console.log(`Full-stack server listening on http://localhost:${PORT}`);
  console.log('Rewriting product/category links to local index_*.html');
});
