const express = require('express');
const router = express.Router();
const HotelReview = require('../models/HotelReview'); // Make sure this model exists and is correct

// POST a new hotel review
router.post('/', async (req, res) => {
  try {
    console.log('Incoming hotel review:', req.body); // ✅ Log what was sent
    const { user, hotel, stars, comment } = req.body;

    const newReview = new HotelReview({
      user,
      hotel,
      stars,
      comment
    });

    await newReview.save();
    res.status(201).json(newReview);

  } catch (err) {
    console.error('Hotel review error:', err); // ✅ Show actual error
    res.status(500).json({ message: 'Failed to submit hotel review' });
  }
});

// GET reviews for a specific hotel
router.get('/', async (req, res) => {
  const { hotelId } = req.query;
  try {
    const reviews = await HotelReview.find({ hotel: hotelId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching hotel reviews:', err);
    res.status(500).json({ message: 'Failed to fetch hotel reviews' });
  }
});

module.exports = router;
