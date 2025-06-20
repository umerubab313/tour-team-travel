const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');

// GET /api/restaurants?city=CityName
router.get('/', async (req, res) => {
  const { city } = req.query;
  try {
    const query = city ? { city } : {};
    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// GET /api/restaurants/:id
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
