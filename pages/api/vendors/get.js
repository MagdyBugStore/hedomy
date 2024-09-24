// pages/api/vendor/get.js
import connectDB from '../../../db';
import Vendor from '../../../models/vendor';

connectDB();

export default async function handler(req, res) {
  
  if (req.method === 'GET') {
    try {

      const vendors = await Vendor.find(); 
      res.status(200).json(vendors);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}