const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  name: String,
  city: String,
  type: String,
  description: String,
  image: String
});

module.exports = mongoose.model('Listing', listingSchema);
