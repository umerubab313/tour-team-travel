const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
  name: String,
  city: String,
  rating: Number,
  description: String,
  image: String
});

module.exports = mongoose.model('Spot', SpotSchema);
