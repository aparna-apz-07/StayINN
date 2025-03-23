const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    BName: { type: String, required: true },  // Business Name
    BAddress: { type: String, required: true },  // Business Address
    BRegister: { type: String, required: true },  // Business Registration Number
    OwnerName: { type: String, required: true },  // Owner's Name
    HotelEmail: { type: String, required: true, unique: true },  // Email (String type)
    Phone: { type: String, required: true },  // Store phone as a string to prevent number issues
    Password: { type: String, required: true }  // Password should be a string
});

const Hotel = mongoose.model('Hotel', HotelSchema);

module.exports = Hotel;
