const mongoose = require('mongoose');

const RestaurantReviewSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  stars: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RestaurantReview', RestaurantReviewSchema);