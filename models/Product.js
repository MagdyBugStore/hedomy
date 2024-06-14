// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    en: String,
    ar: String,
  },
  desc: {
    en: String,
    ar: String,
  },
  gender: Number,
  colors: [String],
  brand: Number,
  category: Number,
  slug: String,
  group:String,
  images: [
    {
      img: String,
    },
  ],
  price: Number,
  totalSell: Number,
  gallery: [
    {
      img: String,
    },
  ],
  condition: String,
  vendor: String,
  featured: Boolean,
  trending: Boolean,
  discount: {
    banner: String,
    percentage: Number,
    expireDate: Date,
    isActive: Boolean,
  },
  variations: [String],
  material: {
    en: String,
    ar: String,
  },
  tags: [String],
  sizes: String,
  review: Number,
  rating: Number,
  stock: Number,
  ratingScore: Number,
  group: Number,
  dimension: {
    en: String,
    ar: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const Product = mongoose.models.Items || mongoose.model('Items', productSchema);

export default Product;