const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Product = require('../models/Product');


// GET all categories
router.get('/', async (req, res) => {
  try {
    // populate subcategories for each category
    const categories = await Category.find({ isActive: true }).sort({ name: 1 }).populate('subcategories');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET category by slug (include subcategories and combined products)
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).populate('subcategories');
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // gather subcategory ids for this category
    let subcatIds = [];
    if (category.subcategories && category.subcategories.length > 0) {
      subcatIds = category.subcategories.map(sc => sc._id);
    } else {
      const Subcategory = require('../models/Subcategory');
      const subs = await Subcategory.find({ category: category._id, isActive: true });
      subcatIds = subs.map(s => s._id);
    }

    // Fetch products that belong to any of the subcategories OR directly to the category
    const products = await Product.find({
      $and: [
        { isActive: true },
        {
          $or: [
            { subcategory: { $in: subcatIds } },
            { category: category.slug }
          ]
        }
      ]
    }).sort({ articleNumber: 1 }).populate('subcategory');

    res.json({ category, products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

