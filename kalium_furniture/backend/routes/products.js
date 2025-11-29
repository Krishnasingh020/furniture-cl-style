// backend/routes/products.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const Subcategory = require('../models/Subcategory');

// GET /api/products?category=decor&subcategory=...&isActive=true
router.get('/', async (req, res) => {
  try {
    const { category, isActive, subcategory } = req.query;
    const query = {};

    if (category) {
      // Check if the 'category' param is actually a subcategory slug
      const subcat = await Subcategory.findOne({ slug: category });
      if (subcat) {
        query.subcategory = subcat._id;
      } else {
        // Otherwise assume it's a parent category slug (or legacy string)
        query.category = category;
      }
    }

    if (subcategory) {
      // allow passing subcategory id or slug explicitly
      if (mongoose.Types.ObjectId.isValid(subcategory)) {
        query.subcategory = subcategory;
      } else {
        const sub = await Subcategory.findOne({ slug: subcategory });
        if (sub) query.subcategory = sub._id;
      }
    }

    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    console.log('[GET /api/products] Incoming Query Params:', req.query);
    console.log('[GET /api/products] MongoDB Query:', query);
    const products = await Product.find(query)
      .sort({ articleNumber: 1 })
      .populate('subcategory');
    console.log('[GET /api/products] Found:', products.length);

    res.json(products);
  } catch (error) {
    console.error('[GET /api/products] Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/subcategory/:slug
router.get('/subcategory/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const Subcategory = require('../models/Subcategory');

    const subcat = await Subcategory.findOne({ slug });
    if (!subcat) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    const products = await Product.find({
      subcategory: subcat._id,
      isActive: true
    })
      .sort({ articleNumber: 1 })
      .populate('subcategory');

    res.json(products);
  } catch (error) {
    console.error('[GET /api/products/subcategory/:slug] Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/slug/:slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      'subcategory'
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('[GET /api/products/slug/:slug] Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/article/:articleNumber
router.get('/article/:articleNumber', async (req, res) => {
  try {
    const product = await Product.findOne({
      articleNumber: req.params.articleNumber
    }).populate('subcategory');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('[GET /api/products/article/:articleNumber] Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('subcategory');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('[GET /api/products/:id] Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
