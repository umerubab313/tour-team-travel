const mongoose = require('mongoose');

const GuideReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guide: { type: mongoose.Schema.Types.ObjectId, ref: 'Guide',required: true  },
  stars: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GuideReview', GuideReviewSchema);