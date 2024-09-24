// pages/api/products/get.js
import connectDB from '../../../db';
import Product from '../../../models/Product';

connectDB();

export default async function handler(req, res) {

  if (req.method === 'GET') {
    
    try {
      const { gender, values, limit, search, vendor , slug } = req.query;
      const filter = {};

      if (search) {
        filter["title.ar"] = { $regex: new RegExp(search, 'i') };
      }

      if (slug) {
        filter.slug = slug;
      }

      if (gender) {
        filter.gender = gender;
      }
      if (vendor) {
        filter.vendor = vendor;
      }
      
      filter.stock = { $gt: 0 };

      const select = {};

      if (values && values !== 'all') {
        values.split(',').forEach(field => {
          select[field] = 1;
        });
      }
      
      var products = []
      if (values === 'all') {
        products = await Product.find(filter).limit(limit)
      } else {
        products = await Product.find(filter).select(select).limit(limit)
      }
      
      res.status(200).json(products);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}