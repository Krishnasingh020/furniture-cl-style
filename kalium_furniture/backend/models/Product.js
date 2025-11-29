// backend/models/Product.js
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    src: { type: String, required: true },
    thumb: { type: String },
    alt: { type: String }
  },
  { _id: false }
);

const reviewSchema = new mongoose.Schema(
  {
    author: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  metaTitle: { type: String },
  metaDescription: { type: String },
  h1Tag: { type: String },
  headerDescription: { type: String },

  price: { type: mongoose.Schema.Types.Decimal128, required: true },
  originalPrice: { type: mongoose.Schema.Types.Decimal128, default: null },
  currencySymbol: { type: String, default: '$' },

  features: { type: String, required: true },
  description: { type: String, required: true },
  dimensions: { type: String },
  materials: { type: String },
  finish: { type: String },
  designer: { type: String },
  countryOfOrigin: { type: String },
  importerPackerMarketer: { type: String },

  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },

  offer: {
    isOnOffer: { type: Boolean, default: false },
    discountPercent: { type: Number, min: 0, max: 100 },
    offerPrice: { type: mongoose.Schema.Types.Decimal128 }
  },

  colors: [{ type: String }],
  articleNumber: { type: String },
  images: [imageSchema],
  reviews: [reviewSchema],

  rating: { type: Number, min: 0, max: 5, default: 0 },
  category: { type: String, default: 'default' },
  slug: { type: String, unique: true, sparse: true },
  isActive: { type: Boolean, default: true },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Convert Decimal128 fields to string when returning JSON
productSchema.set('toJSON', {
  transform: (doc, ret) => {
    if (ret.price && ret.price.toString) {
      ret.price = ret.price.toString();
    }
    if (ret.originalPrice && ret.originalPrice.toString) {
      ret.originalPrice = ret.originalPrice.toString();
    }
    if (ret.offer && ret.offer.offerPrice && ret.offer.offerPrice.toString) {
      ret.offer.offerPrice = ret.offer.offerPrice.toString();
    }
    return ret;
  }
});

// Calculate and update rating from reviews before saving
productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();

  if (this.reviews && this.reviews.length > 0) {
    const sum = this.reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
    this.rating = Math.round((sum / this.reviews.length) * 10) / 10;
  } else if (this.rating === undefined || this.rating === null) {
    this.rating = 0;
  }

  next();
});

// Generate slug from name if not provided
productSchema.pre('save', function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
