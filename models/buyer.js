import mongoose from 'mongoose';

const buyerSchema = new mongoose.Schema({
  products: [{
    _id: String,
    quantity: Number
  }],
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
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

const Buyer = mongoose.models.Buyer || mongoose.model('Buyer', buyerSchema);

export default Buyer;
