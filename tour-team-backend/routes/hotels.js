const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel'); // Adjust path if needed

// GET /api/hotels?city=CityName
router.get('/', async (req, res) => {
  const { city } = req.query;
  console.log('Fetching hotels for:', city); // Debug log
  try {
    const hotels = await Hotel.find(city ? { city } : {});
    res.json(hotels);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
// GET /api/hotels/:id
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
