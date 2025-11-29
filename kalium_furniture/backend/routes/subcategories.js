const express = require('express');
const router = express.Router();
const Subcategory = require('../models/Subcategory');
const Product = require('../models/Product');

// GET all subcategories
router.get('/', async (req, res) => {
  try {
    const subcategories = await Subcategory.find({ isActive: true }).sort({ name: 1 });
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET subcategory by slug and include related products
router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const subcat = await Subcategory.findOne({ slug });
    if (!subcat) return res.status(404).json({ error: 'Subcategory not found' });

    // Fetch products related to this subcategory
    const products = await Product.find({ subcategory: subcat._id, isActive: true }).sort({ createdAt: -1 });

    res.json({ subcategory: subcat, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
