// pages/api/users.js
import User from '../../models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
