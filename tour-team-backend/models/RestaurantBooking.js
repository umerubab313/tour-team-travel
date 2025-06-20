const mongoose = require('mongoose');

const RestaurantBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  bookingDate: { type: Date, required: true },
  bookingTime: { type: String, required: true }, // e.g., "19:30"
  guests: { type: Number, required: true },
  status: { type: String, default: 'confirmed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RestaurantBooking', RestaurantBookingSchema);