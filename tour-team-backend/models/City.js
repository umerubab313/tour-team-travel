const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String },
  description: { type: String },
  image: { type: String }
});

module.exports = mongoose.model('City', CitySchema);