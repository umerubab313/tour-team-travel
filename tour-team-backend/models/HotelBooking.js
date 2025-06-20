const mongoose = require('mongoose');

const HotelBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
  bookingDate: { type: Date, required: true },
  bookingTime: { type: String, required: true },
  nights: { type: Number, required: true },
  rooms: { type: Number, required: true }, // NEW field for number of rooms
  feePerNight: { type: Number, required: true },
  cost: { type: Number, required: true }, // NEW field for total cost
  status: { type: String, default: 'confirmed' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HotelBooking', HotelBookingSchema);