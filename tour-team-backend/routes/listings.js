const express = require('express');
const router = express.Router();
const Listing = require('../models/listings'); // adjust path

router.get('/', async (req, res) => {
  const { city, type } = req.query;
  try {
    const listings = await Listing.find({ city, type });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch listings' });
  }
});

module.exports = router;
