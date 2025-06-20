const express = require('express');
const router = express.Router();
const HotelBooking = require('../models/HotelBooking');
const Hotel = require('../models/Hotel');

// Create a new hotel booking
router.post('/', async (req, res) => {
  const { user, hotel, bookingDate, bookingTime, nights, rooms } = req.body;

  if (!user || !hotel || !bookingDate || !bookingTime || !nights || !rooms) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Get feePerNight from Hotel collection
    const hotelData = await Hotel.findById(hotel);
    if (!hotelData) {
      return res.status(404).json({ message: 'Hotel not found' });
    }

    const feePerNight = hotelData.feePerNight;
    const cost = feePerNight * nights * rooms;

    const booking = new HotelBooking({
      user,
      hotel,
      bookingDate,
      bookingTime,
      nights,
      rooms,
      feePerNight,
      cost
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created', booking });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;