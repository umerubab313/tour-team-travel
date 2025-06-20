const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: String,
  city: String,
  cuisine: String,
  rating: Number,
  description: String,
  image: String
});

module.exports = mongoose.model('Restaurant', RestaurantSchema);