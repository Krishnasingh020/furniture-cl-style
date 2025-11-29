const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  src: { type: String, required: true },
  thumb: { type: String },
  alt: { type: String }
}, { _id: false });

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true, required: true },
  metaTitle: { type: String },
  metaDescription: { type: String },
  h1Tag: { type: String },
  headerDescription: { type: String },
  images: [imageSchema],
  // Subcategories under this category
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }],
  description: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

categorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);

