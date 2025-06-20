const express = require('express');
const router = express.Router();
const Guide = require('../models/Guide');

// GET /api/guides?city=CityName
router.get('/', async (req, res) => {
  const { city } = req.query;
  console.log('Fetching Tour Guides for:', city);
  try {
    const query = city ? { city: new RegExp(`^${city}$`, 'i') } : {};
    const guides = await Guide.find(query);
    res.json(guides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/guides/:id
router.get('/:id', async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: 'Guide not found' });
    res.json(guide);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;