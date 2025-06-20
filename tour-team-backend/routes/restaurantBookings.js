const express = require('express');
const router = express.Router();
const RestaurantBooking = require('../models/RestaurantBooking');

// POST - Create a restaurant booking
router.post('/', async (req, res) => {
  try {
    const { user, item, bookingDate, bookingTime, guests } = req.body;
    const newBooking = new RestaurantBooking({
      user,
      item,
      bookingDate,
      bookingTime,
      guests
    });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create booking.' });
  }
});

module.exports = router;