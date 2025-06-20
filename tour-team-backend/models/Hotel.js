const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  rating: { type: Number },
  description: { type: String },
  image: { type: String },
  feePerNight: { type: Number, required: true }  // New field to store the fee per night
});

module.exports = mongoose.model('Hotel', HotelSchema);
