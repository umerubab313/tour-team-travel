const express = require('express');
const router = express.Router();
const GuideReview = require('../models/GuideReview');

// POST a new guide review
router.post('/', async (req, res) => {
  try {
    console.log('Incoming guide review:', req.body);
    const { user, guide, stars, comment } = req.body;

    const newReview = new GuideReview({
      user,
      guide,
      stars,
      comment
    });

    await newReview.save();
    res.status(201).json(newReview);

  } catch (err) {
    console.error('Guide review error:', err);
    res.status(500).json({ message: 'Failed to submit guide review' });
  }
});

// GET reviews for one guide
router.get('/', async (req, res) => {
  const { guideId } = req.query;
  try {
    const reviews = await GuideReview.find({ guide: guideId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching guide reviews:', err);
    res.status(500).json({ message: 'Failed to fetch guide reviews' });
  }
});

module.exports = router;
