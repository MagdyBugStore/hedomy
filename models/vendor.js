// models/vendor.js
import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
        img: String,
        name: String,
        reviewCount: String,
        ratingWidth: String,
        Rating: String,
        Ship_on_time: String,
        Chat_response: String,
        description: String,
        join:{
            type: Date,
            default: Date.now,
          }
    }
);
const Vendor = mongoose.models.Items || mongoose.model('Vednors', vendorSchema);

export default Vendor;