// pages/api/vendors/add.js
import connectDB from '../../../db';
import Vendor from '../../../models/vendor';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const {
        title,
        desc,
        gender,
        colors,
        brand,
        category,
        slug,
        images,
        price,
        totalSell,
        gallery,
        condition,
        vendor,
        featured,
        trending,
        discount,
        variations,
        material,
        tags,
        sizes,
        review,
        rating,
        stock,
        ratingScore,
        dimension,
      } = req.body;

      // Create a new product using the Product model
      const product = new Vendor({
       
      }); 

      // Save the product to the database
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}