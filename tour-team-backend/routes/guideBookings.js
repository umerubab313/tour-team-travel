const express = require('express');
const router = express.Router();
const GuideBooking = require('../models/GuideBooking');
const Guide = require('../models/Guide');

// POST: Create booking
router.post('/', async (req, res) => {
  const { user, guide, bookingDate, bookingTime } = req.body;

  if (!user || !guide || !bookingDate || !bookingTime) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const guideData = await Guide.findById(guide);
    if (!guideData) return res.status(404).json({ message: 'Guide not found' });

    const booking = new GuideBooking({
      user,
      guide,
      bookingDate,
      bookingTime,
      feePerTrip: guideData.feePerTrip
    });

    await booking.save();
    res.status(201).json({ message: 'Booking confirmed', booking });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;