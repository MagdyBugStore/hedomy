import connectDB from '../../../db';
import Buyer from "../../../models/buyer";

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { firstName, lastName, email, phoneNumber, address, products } = req.body;

      const newBuyer = new Buyer({
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        products
      });

      // Save the new buyer to the database
      const savedBuyer = await newBuyer.save();

      // Respond with the saved buyer data
      res.status(201).json(savedBuyer);
    } catch (error) {
      console.error('Error saving data to database:', error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
