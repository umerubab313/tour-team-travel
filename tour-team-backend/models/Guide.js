const mongoose = require('mongoose');
delete mongoose.connection.models['Guide'];

const GuideSchema = new mongoose.Schema({
  name: String,
  city: String,
  rating: Number,
  description: String,
  image: String,
  feePerTrip: Number,           // NEW FIELD
  language: String              // NEW FIELD (you can use Array if multiple langs)
});

module.exports = mongoose.model('Guide', GuideSchema);