const express = require('express');
const router = express.Router();
const Spot = require('../models/Spot'); // Make sure path is correct

// GET /api/spots?city=CityName
router.get('/', async (req, res) => {
  const { city } = req.query;
  console.log('Fetching spots for:', city); // Debug log
  try {
    const spots = await Spot.find(city ? { city } : {});
    res.json(spots);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/spots/:id (optional if needed)
router.get('/:id', async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.id);
    if (!spot) return res.status(404).json({ message: 'Spot not found' });
    res.json(spot);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;