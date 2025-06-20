const express = require('express');
const router = express.Router();
const RestaurantReview = require('../models/RestaurantReview');
// authMiddleware removed per your approach

// POST a new review
router.post('/', async (req, res) => {
  try {
    console.log('Incoming review:', req.body); // ✅ Log what was sent
    const { user, restaurant, stars, comment } = req.body;

    const newReview = new RestaurantReview({
      user,
      restaurant,
      stars,
      comment
    });

    await newReview.save();
    res.status(201).json(newReview);

  } catch (err) {
    console.error('Review error:', err); // ✅ Show actual error
    res.status(500).json({ message: 'Failed to submit review' });
  }
});


// GET reviews for one restaurant
router.get('/', async (req, res) => {
  const { restaurantId } = req.query;
  try {
    const reviews = await RestaurantReview.find({ restaurant: restaurantId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    console.error('Failed to fetch restaurant reviews:', err);
    res.status(500).json({ message: 'Failed to fetch restaurant reviews' });
  }
});



module.exports = router;