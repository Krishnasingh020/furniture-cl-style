/**
 * API Client for Kalium Furniture
 * Handles all API calls to the REST backend
 */

// Always use the same origin as the current page (no hardcoded ports)
const API_BASE_URL = `${window.location.origin.replace(/\/$/, '')}/api`;
console.log('[API] Base URL:', API_BASE_URL);

// Test API connection on load
async function testAPIConnection() {
  const url = `${API_BASE_URL}/health`;
  console.log('[API] Testing backend connection at:', url);

  try {
    const response = await fetch(url);
    if (response.ok) {
      console.log('[API] Backend server is reachable');
      return true;
    } else {
      console.warn('[API] Backend server returned error status:', response.status);
      return false;
    }
  } catch (error) {
    console.error('[API] Backend server is not reachable:', error.message);
    console.error('[API] Make sure the backend server is running at', API_BASE_URL);
    return false;
  }
}

// Test connection when script loads (non-blocking)
testAPIConnection();

/**
 * Fetch product by ID
 */
async function fetchProductById(productId) {
  const url = `${API_BASE_URL}/products/${productId}`;
  console.log('[API] fetchProductById:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
}

/**
 * Fetch product by slug
 */
async function fetchProductBySlug(slug) {
  const url = `${API_BASE_URL}/products/slug/${slug}`;
  console.log('[API] fetchProductBySlug:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    throw error;
  }
}

/**
 * Fetch product by article number
 */
async function fetchProductByArticleNumber(articleNumber) {
  const url = `${API_BASE_URL}/products/article/${articleNumber}`;
  console.log('[API] fetchProductByArticleNumber:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product by article number:', error);
    throw error;
  }
}

/**
 * Fetch all products (optionally filtered by category)
 */
async function fetchProducts(category = null) {
  let url = `${API_BASE_URL}/products?isActive=true`;
  if (category) {
    url += `&category=${encodeURIComponent(category)}`;
  }
  console.log('[API] fetchProducts:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('[API] fetchProducts result length:', Array.isArray(data) ? data.length : 'N/A');
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch category by slug
 */
async function fetchCategoryBySlug(slug) {
  const url = `${API_BASE_URL}/categories/${slug}`;
  console.log('[API] fetchCategoryBySlug:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching category by slug:', error);
    throw error;
  }
}

/**
 * Fetch subcategory by slug
 */
async function fetchSubcategoryBySlug(slug) {
  const url = `${API_BASE_URL}/subcategories/${slug}`;
  console.log('[API] fetchSubcategoryBySlug:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching subcategory by slug:', error);
    throw error;
  }
}

/**
 * Get URL parameter
 */
function getURLParameter(name) {
  if (window.URLSearchParams) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * NEW: get current category slug from ?category= or filename fallback
 */
/**
 * NEW: get current category slug from ?category= or filename fallback
 */
/**
 * NEW: get current category slug from ?category=, /category/:slug,
 * index*.html/:slug, or last path segment /something/:slug
 */
function getCurrentCategorySlug() {
  // 1) Prefer query parameter, e.g. index_decor.html?category=armchairs
  const slugFromParam = getURLParameter('category');
  console.log('[getCurrentCategorySlug] slugFromParam:', slugFromParam);
  if (slugFromParam) return slugFromParam;

  const path = window.location.pathname || '/';
  console.log('[getCurrentCategorySlug] pathname:', path);

  // 2) /category/:slug OR /index_decor/category/:slug
  let match = path.match(/\/category\/([^\/]+)/);
  if (match && match[1]) {
    console.log('[getCurrentCategorySlug] slug from /category/:', match[1]);
    return decodeURIComponent(match[1]);
  }

  // 3) index*.html/:slug  -> handles index_decor.html/living or index.html/product
  match = path.match(/\/[^\/]*index[^\/]*\.html\/([^\/]+)/);
  if (match && match[1]) {
    console.log('[getCurrentCategorySlug] slug from index*.html/:', match[1]);
    return decodeURIComponent(match[1]);
  }

  // 4) generic last segment if it's not a .html file
  const segments = path.split('/').filter(Boolean); // removes empty segments
  if (segments.length) {
    const last = segments[segments.length - 1];
    if (!last.includes('.html')) {
      console.log('[getCurrentCategorySlug] slug from last segment:', last);
      return decodeURIComponent(last);
    }
  }

  // 5) fallback: index_<slug>.html  => extract slug part after "index_"
  match = path.match(/index_([^\/]+)\.html/);
  if (match && match[1]) {
    console.log('[getCurrentCategorySlug] slug from filename fallback:', match[1]);
    return decodeURIComponent(match[1]);
  }

  console.log('[getCurrentCategorySlug] no category found');
  return null;
}

/**
 * Update dynamic content on the page with product data
 */
function updateDynamicContent(productData) {
  const productNameEl = document.getElementById('dynamic-product-name');
  if (productNameEl) {
    productNameEl.textContent = productData.name;
  } else {
    console.warn('[updateDynamicContent] productNameEl NOT found');
  }

  // Update page title
  document.title = productData.name + ' – Furnistør';

  // Update meta tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', productData.name);
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute('content', productData.features);
  }

  // Update product features/description
  const productFeaturesEl = document.getElementById('dynamic-product-features');
  if (productFeaturesEl) {
    const pTag = productFeaturesEl.querySelector('p');
    if (pTag) {
      pTag.textContent = productData.features;
    } else {
      productFeaturesEl.innerHTML = `<p>${productData.features}</p>`;
    }
  }

  // Update product price (handles both regular and sale prices)
  const productPriceEl = document.getElementById('dynamic-product-price');
  if (productPriceEl) {
    if (productData.originalPrice) {
      productPriceEl.innerHTML =
        '<del aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">' +
        productData.currencySymbol +
        '</span>' +
        productData.originalPrice +
        '</bdi></span></del> <span class="screen-reader-text">Original price was: ' +
        productData.currencySymbol +
        productData.originalPrice +
        '.</span><ins aria-hidden="true"><span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">' +
        productData.currencySymbol +
        '</span>' +
        productData.price +
        '</bdi></span></ins><span class="screen-reader-text">Current price is: ' +
        productData.currencySymbol +
        productData.price +
        '.</span>';
    } else {
      productPriceEl.innerHTML =
        '<span class="woocommerce-Price-amount amount"><bdi><span class="woocommerce-Price-currencySymbol">' +
        productData.currencySymbol +
        '</span>' +
        productData.price +
        '</bdi></span>';
    }
  }

  // Helper function to update element with text
  const updateElement = (elementId, value) => {
    const el = document.getElementById(elementId);
    if (el && value) {
      const pTag = el.querySelector('p');
      if (pTag) {
        pTag.textContent = value;
      } else {
        el.innerHTML = `<p>${value}</p>`;
      }
    }
  };

  updateElement('dynamic-designer-name', productData.designer);
  updateElement('dynamic-country-origin', productData.countryOfOrigin);
  updateElement('dynamic-importer-packer', productData.importerPackerMarketer);
  updateElement('dynamic-article-number', productData.articleNumber);

  // Update product description (short description)
  const descriptionEl = document.getElementById('dynamic-product-description');
  if (descriptionEl && productData.description) {
    // Check if it has a p tag inside
    const pTag = descriptionEl.querySelector('p');
    if (pTag) {
      pTag.textContent = productData.description;
    } else {
      descriptionEl.textContent = productData.description;
    }
  }

  updateElement('dynamic-dimensions', productData.dimensions);
  updateElement('dynamic-materials', productData.materials);
  updateElement('dynamic-finish', productData.finish);

  // Update product images
  if (productData.images && productData.images.length > 0) {
    const galleryImages = document.querySelectorAll(
      '#dynamic-product-gallery .dynamic-product-image'
    );

    // Update each image in the gallery
    galleryImages.forEach(function (img, index) {
      if (productData.images[index]) {
        const imageData = productData.images[index];
        img.src = imageData.src;
        img.alt = imageData.alt || productData.name;
        img.title = imageData.alt || productData.name;

        if (imageData.thumb) {
          img.setAttribute('data-thumb-image', imageData.thumb);
        }
        if (imageData.src) {
          img.setAttribute('data-full-image', imageData.src);
        }

        if (img.width) {
          img.setAttribute('srcset', `${imageData.src} ${img.width}w`);
        }
      }
    });

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && productData.images[0]) {
      ogImage.setAttribute('content', productData.images[0].src);
    }

    const itemImage = document.querySelector('link[itemprop="image"]');
    if (itemImage && productData.images[0]) {
      itemImage.setAttribute('href', productData.images[0].src);
    }
  }

  // Update reviews
  if (productData.reviews && productData.reviews.length > 0) {
    updateReviews(productData.reviews);
  }
}

/**
 * Update reviews section with product reviews
 */
function updateReviews(reviews) {
  const reviewsContainer = document.querySelector('#comments .commentlist');
  if (!reviewsContainer) return;

  // Clear existing reviews
  reviewsContainer.innerHTML = '';

  // Calculate average rating
  const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  // Add each review
  reviews.forEach((review, index) => {
    const reviewDate = new Date(review.date);
    const formattedDate = reviewDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const reviewItem = document.createElement('li');
    reviewItem.className = `review ${index % 2 === 0 ? 'even' : 'odd'} ${index % 2 === 0 ? 'thread-even' : 'thread-odd'
      } depth-1`;
    reviewItem.id = `li-comment-${index + 1}`;

    const ratingPercent = (review.rating / 5) * 100;

    reviewItem.innerHTML = `
      <div id="comment-${index + 1}" class="comment_container">
        <div class="comment-text">
          <div class="star-rating" role="img" aria-label="Rated ${review.rating} out of 5">
            <span style="width:${ratingPercent}%">Rated <strong class="rating">${review.rating}</strong> out of 5</span>
          </div>
          <p class="meta">
            <strong class="woocommerce-review__author">${review.author}</strong>
            <span class="woocommerce-review__dash">–</span>
            <time class="woocommerce-review__published-date" datetime="${reviewDate.toISOString()}">${formattedDate}</time>
          </p>
          <div class="description">
            <p>${review.comment}</p>
          </div>
        </div>
      </div>
    `;

    reviewsContainer.appendChild(reviewItem);
  });

  // Update review summary
  const summaryContainer = document.querySelector('.woocommerce-review-rating-summary');
  if (summaryContainer) {
    const avgRatingPercent = (avgRating / 5) * 100;
    summaryContainer.innerHTML = `
      <div class="star-rating" role="img" aria-label="Rated ${avgRating.toFixed(
      1
    )} out of 5" style="font-size: 1.2em;">
        <span style="width:${avgRatingPercent}%">Rated <strong class="rating">${avgRating.toFixed(
      1
    )}</strong> out of 5</span>
      </div>
      <p style="margin-top: 0.5em; color: #646360;">Based on ${reviews.length} review${reviews.length !== 1 ? 's' : ''
      }</p>
    `;
  }
}

/**
 * Get filename from current page URL
 */
function getPageFilename() {
  let filename = window.location.pathname.split('/').pop();
  if (!filename || filename === '' || filename === '/') {
    filename = window.location.href.split('/').pop();
  }
  filename = filename.split('?')[0].split('#')[0];
  if (!filename || filename === '') {
    const pathParts = window.location.pathname.split('/').filter(p => p);
    filename = pathParts[pathParts.length - 1] || 'index.html';
  }
  console.log('[getPageFilename] Detected filename:', filename, 'from URL:', window.location.href);
  return filename;
}

/**
 * Get product identifier based on current page filename
 * (kept mainly for old mirrored product pages)
 */
function getProductIdentifierFromPage() {
  const filename = getPageFilename();
  const pageToProductMap = {
    'index_tact-mirror.html': { slug: 'tact-mirror' },
    'index_tact.html': { slug: 'tact-mirror' },
    'index_mirrors.html': { category: 'mirrors' },
    'index_rugs.html': { category: 'rugs' },
    'index_decor.html': { category: 'decor' },
    'index_newzealand-wool.html': { articleNumber: 'NZ-WOOL-RUNNER-001' }
  };
  return pageToProductMap[filename] || null;
}

/**
 * Initialize product page - fetch and display product data
 */
async function initializeProductPage() {
  try {
    console.log('[initializeProductPage] Starting initialization');
    const productId = getURLParameter('id');
    const productSlug = getURLParameter('slug');
    const articleNumber = getURLParameter('article');
    const productParam = getURLParameter('product');

    console.log('[initializeProductPage] Params:', { productId, productSlug, articleNumber, productParam });

    let productData = null;

    // NEW: Check for /product/:slug in path
    const path = window.location.pathname;
    const productMatch = path.match(/\/product\/([^\/]+)/);
    if (productMatch && productMatch[1]) {
      console.log('[initializeProductPage] Extracted slug from path:', productMatch[1]);
      productData = await fetchProductBySlug(productMatch[1]);
    } else if (articleNumber) {
      console.log('[initializeProductPage] Fetching by article:', articleNumber);
      productData = await fetchProductByArticleNumber(articleNumber);
    } else if (productSlug) {
      console.log('[initializeProductPage] Fetching by slug:', productSlug);
      productData = await fetchProductBySlug(productSlug);
    } else if (productId) {
      console.log('[initializeProductPage] Fetching by ID:', productId);
      productData = await fetchProductById(productId);
    } else if (productParam) {
      // Handle legacy or specific product params if needed
      console.log('[initializeProductPage] Fetching by product param:', productParam);
      // ... existing logic for productParam if still relevant ...
    }

    // Fallback: Check page identifier from DOM/Filename if no URL params
    if (!productData) {
      const pageIdentifier = getProductIdentifierFromPage();
      console.log('[initializeProductPage] Fallback identifier:', pageIdentifier);

      if (pageIdentifier) {
        if (pageIdentifier.articleNumber) {
          productData = await fetchProductByArticleNumber(pageIdentifier.articleNumber);
        } else if (pageIdentifier.slug) {
          productData = await fetchProductBySlug(pageIdentifier.slug);
        } else if (pageIdentifier.category) {
          // It's a category page, do nothing here
          console.log('[initializeProductPage] Identifier is a category, skipping product fetch');
        }
      } else {
        // NEW: Try to extract slug from filename: index_some-product.html
        const filename = getPageFilename();
        const match = filename.match(/^index_(.+)\.html$/);
        if (match && match[1]) {
          const potentialSlug = match[1];
          // Exclude known non-product pages
          const nonProductSlugs = ['decor', 'mirrors', 'rugs', 'tact', 'tact-mirror'];
          if (!nonProductSlugs.includes(potentialSlug)) {
            console.log('[initializeProductPage] Extracted slug from filename:', potentialSlug);
            productData = await fetchProductBySlug(potentialSlug);
          }
        }
      }
    }

    if (productData) {
      console.log('[initializeProductPage] Product data found:', productData.name);
      updateDynamicContent(productData);
    } else {
      console.warn('[initializeProductPage] No product data found');
    }
  } catch (error) {
    console.error('Error initializing product page:', error);
  }
}

/**
 * Initialize category page - fetch and display category data
 */
async function initializeCategoryPage() {
  try {
    console.log('[initializeCategoryPage] Starting');

    const categoryTitleEl = document.getElementById('dynamic-category-title');
    const categoryDescEl = document.getElementById('dynamic-category-description');

    console.log('[initializeCategoryPage] Elements found:', {
      titleEl: !!categoryTitleEl,
      descEl: !!categoryDescEl
    });

    if (!categoryTitleEl && !categoryDescEl) {
      console.log('[initializeCategoryPage] No category elements found, skipping');
      return;
    }

    const filename = getPageFilename();
    console.log('[initializeCategoryPage] Filename:', filename);

    // NEW: decide slug from URL params instead of filename mapping
    const categorySlug = getCurrentCategorySlug();
    const subcategorySlug = getURLParameter('subcategory'); // optional future use

    let slug = categorySlug;
    let isCategory = true;

    if (subcategorySlug) {
      slug = subcategorySlug;
      isCategory = false;
    }

    console.log('[initializeCategoryPage] Slug:', slug, ', isCategory:', isCategory);

    if (!slug) {
      console.log('[initializeCategoryPage] No valid slug found');
      return;
    }

    let rawData = null;
    let categoryObj = null;

    try {
      // Try fetching as category first
      console.log('[initializeCategoryPage] Attempting to fetch as category:', slug);
      try {
        rawData = await fetchCategoryBySlug(slug);
        categoryObj = rawData.category || rawData;
        isCategory = true;
      } catch (err) {
        console.log('[initializeCategoryPage] Not a category, trying subcategory:', slug);
        // Fallback to subcategory
        rawData = await fetchSubcategoryBySlug(slug);
        categoryObj = rawData.subcategory || rawData;
        isCategory = false;
      }

      console.log('[initializeCategoryPage] Data received:', categoryObj);
    } catch (error) {
      console.error('[initializeCategoryPage] Primary fetch failed:', error.message);
      try {
        if (isCategory) {
          console.log('[initializeCategoryPage] Trying subcategory instead');
          rawData = await fetchSubcategoryBySlug(slug);
          categoryObj = rawData.subcategory || rawData;
        } else {
          console.log('[initializeCategoryPage] Trying category instead');
          rawData = await fetchCategoryBySlug(slug);
          categoryObj = rawData.category || rawData;
        }
        console.log('[initializeCategoryPage] Alternate fetch succeeded:', categoryObj);
      } catch (alternateError) {
        console.error('[initializeCategoryPage] Both fetches failed');
        return;
      }
    }

    console.log('[initializeCategoryPage] Normalized category object:', categoryObj);


    // ========== NEW: FETCH PRODUCTS FOR THIS CATEGORY =============
    try {
      const categorySlug = getCurrentCategorySlug();
      console.log('[CategoryPage] Loading products for:', categorySlug);

      const products = await fetchProducts(categorySlug);

      console.log('[CategoryPage] Products returned:', products.length);

      renderCategoryProducts(products);
    } catch (err) {
      console.error('[CategoryPage] Could not load category products:', err);
    }


    const displayTitle = categoryObj.h1Tag || categoryObj.name || '';
    console.log('[initializeCategoryPage] Display title to set:', displayTitle);

    if (categoryTitleEl && displayTitle) {
      categoryTitleEl.textContent = displayTitle;
      console.log('[initializeCategoryPage] Set title element to:', displayTitle);
    }

    const pageTitle = (categoryObj.metaTitle || categoryObj.name || '') + ' – Furnistør';
    document.title = pageTitle;
    console.log('[initializeCategoryPage] Set page title to:', pageTitle);

    const preferredDesc =
      categoryObj.headerDescription || categoryObj.description || '';
    console.log('[initializeCategoryPage] Description to set:', preferredDesc);

    if (categoryDescEl && preferredDesc) {
      if (categoryDescEl.tagName === 'P') {
        categoryDescEl.textContent = preferredDesc;
      } else {
        const pTag = categoryDescEl.querySelector('p');
        if (pTag) {
          pTag.textContent = preferredDesc;
        } else {
          categoryDescEl.textContent = preferredDesc;
        }
      }
    }

    try {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && categoryObj.metaDescription) {
        metaDesc.setAttribute('content', categoryObj.metaDescription);
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc && (categoryObj.metaDescription || preferredDesc)) {
        ogDesc.setAttribute('content', categoryObj.metaDescription || preferredDesc);
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle && (categoryObj.metaTitle || displayTitle)) {
        ogTitle.setAttribute('content', categoryObj.metaTitle || displayTitle);
      }
    } catch (e) {
      console.error('[initializeCategoryPage] Meta tag update error:', e);
    }

    console.log('[initializeCategoryPage] Completed successfully');
  } catch (error) {
    console.error('[initializeCategoryPage] Error:', error);
  }
}

// Auto-initialize when DOM is ready
function runInitialization() {
  console.log('[Init] Running initialization, DOM state:', document.readyState);
  console.log('[Init] Current URL:', window.location.href);
  console.log('[Init] Page filename:', getPageFilename());
  console.log(
    '[Init] Looking for dynamic-category-title:',
    !!document.getElementById('dynamic-category-title')
  );
  console.log(
    '[Init] Looking for dynamic-product-name:',
    !!document.getElementById('dynamic-product-name')
  );
  console.log('[Init] API_BASE_URL:', API_BASE_URL);

  setTimeout(() => {
    console.log(
      '[Init] After timeout - Looking for dynamic-category-title:',
      !!document.getElementById('dynamic-category-title')
    );
    console.log('[Init] After timeout - Page filename:', getPageFilename());
    initializeProductPage();
    initializeCategoryPage();
  }, 100);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', runInitialization);
} else {
  runInitialization();
}

window.addEventListener('load', runInitialization);

// Expose functions globally for manual testing
window.manualInitialize = () => {
  console.log('Manually calling runInitialization');
  runInitialization();
};

window.testCategoryFetch = async (slug = 'mirrors') => {
  try {
    console.log('[testCategoryFetch] Testing fetch for slug:', slug);
    const url = `${API_BASE_URL}/categories/${slug}`;
    console.log('[testCategoryFetch] URL:', url);
    const response = await fetch(url);
    console.log('[testCategoryFetch] Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.error('[testCategoryFetch] Error response:', errorText);
      return { error: errorText, status: response.status };
    }
    const data = await response.json();
    console.log('[testCategoryFetch] Success! Data:', data);
    console.log('[testCategoryFetch] Category object:', data.category || data);
    console.log('[testCategoryFetch] h1Tag:', (data.category || data).h1Tag);
    console.log(
      '[testCategoryFetch] headerDescription:',
      (data.category || data).headerDescription
    );
    return data;
  } catch (error) {
    console.error('[testCategoryFetch] Error:', error);
    console.error('[testCategoryFetch] Make sure backend server is running at', API_BASE_URL);
    return { error: error.message };
  }
};

window.debugCategoryPage = async () => {
  console.log('=== DEBUGGING CATEGORY PAGE ===');
  console.log('1. Testing API connection...');
  const apiOk = await testAPIConnection();
  console.log('API connection:', apiOk ? 'OK' : 'FAILED');

  console.log('\n2. Checking page filename...');
  const filename = getPageFilename();
  console.log('Filename:', filename);

  console.log('\n3. Checking DOM elements...');
  const titleEl = document.getElementById('dynamic-category-title');
  const descEl = document.getElementById('dynamic-category-description');
  console.log('Title element:', titleEl ? 'Found' : 'NOT FOUND');
  console.log('Description element:', descEl ? 'Found' : 'NOT FOUND');

  console.log('\n4. Testing category fetch using getCurrentCategorySlug...');
  const slug = getCurrentCategorySlug();
  const testData = await window.testCategoryFetch(slug);

  console.log('\n5. Running initialization...');
  await initializeCategoryPage();

  console.log('\n=== DEBUG COMPLETE ===');
  return {
    apiOk,
    filename,
    slug,
    titleEl: !!titleEl,
    descEl: !!descEl,
    testData
  };
};



function renderCategoryProducts(products) {
  const grid = document.getElementById('dynamic-product-grid');
  if (!grid) {
    console.warn('[renderCategoryProducts] No grid found');
    return;
  }

  grid.innerHTML = '';

  if (!products || products.length === 0) {
    grid.innerHTML = '<p>No products found in this category.</p>';
    return;
  }

  products.forEach(product => {
    const firstImage = product.images?.[0];

    const productLink = `/product/${product.slug}`;

    const li = document.createElement('li');
    li.className = 'product';

    li.innerHTML = `
      <a href="${productLink}" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">

        ${firstImage ? `
            <img width="300" height="300"
                 src="${firstImage.src}"
                 class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
                 alt="${firstImage.alt || product.name}" />
        ` : ''}

        <h2 class="woocommerce-loop-product__title">${product.name}</h2>

        <span class="price">
          <span class="woocommerce-Price-amount amount">
            <bdi>
              <span class="woocommerce-Price-currencySymbol">${product.currencySymbol || '$'}</span>
              ${product.price}
            </bdi>
          </span>
        </span>

      </a>
    `;

    grid.appendChild(li);
  });
}


console.log('[api-client.js] Script loaded successfully');

// Intercept mirrored external links to keep user on local clone
document.addEventListener(
  'click',
  function (ev) {
    try {
      const anchor = ev.target.closest && ev.target.closest('a');
      if (!anchor || !anchor.href) return;

      let url;
      try {
        url = new URL(anchor.href);
      } catch (err) {
        return;
      }

      if (url.hostname && url.hostname.includes('sites.kaliumtheme.com')) {
        let path = url.pathname || '/';
        if (path.endsWith('/')) path = path.slice(0, -1);
        const parts = path.split('/').filter(Boolean);
        let targetLocal = null;

        const prodIdx = parts.indexOf('product');
        const catIdx = parts.indexOf('product-category');

        if (prodIdx !== -1 && parts.length > prodIdx + 1) {
          // Product slug -> keep using individual mirrored pages (index_<slug>.html)
          const slug = parts[prodIdx + 1];
          targetLocal = `index_${slug}.html`;
        } else if (catIdx !== -1 && parts.length > catIdx + 1) {
          // Category slug -> use /index_decor/category/:slug as requested
          const slug = parts[catIdx + 1];
          targetLocal = `/index_decor/category/${slug}`;
        } else if (path.includes('/products')) {
          targetLocal = 'index_decor.html';
        } else {
          targetLocal = '/';
        }

        try {
          try {
            anchor.removeAttribute && anchor.removeAttribute('onclick');
          } catch (e) { }
          try {
            anchor.onclick = null;
          } catch (e) { }
          anchor.setAttribute('href', targetLocal);
        } catch (e) { }

        ev.preventDefault();
        try {
          window.location.href = targetLocal;
        } catch (navErr) {
          console.error(
            'Navigation prevented to external site; attempted local target:',
            targetLocal,
            navErr
          );
        }
      }
    } catch (e) {
      console.error('Link interceptor error', e);
    }
  },
  { capture: true }
);
