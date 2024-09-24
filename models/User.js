// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  // Define other fields as needed
});

const User = mongoose.model('User', userSchema);

export default User;
