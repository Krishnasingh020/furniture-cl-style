const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  src: { type: String, required: true },
  thumb: { type: String },
  alt: { type: String }
}, { _id: false });

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  metaTitle: { type: String },
  metaDescription: { type: String },
  h1Tag: { type: String },
  headerDescription: { type: String },
  images: [imageSchema],
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

subcategorySchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Subcategory', subcategorySchema);
