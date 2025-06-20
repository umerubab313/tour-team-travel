const express = require('express');
const router = express.Router();

const HotelBooking = require('../models/HotelBooking');
const RestaurantBooking = require('../models/RestaurantBooking');
const GuideBooking = require('../models/GuideBooking');
const Hotel = require('../models/Hotel');
const Restaurant = require('../models/Restaurant');
const TourGuide = require('../models/Guide');

// GET /api/admin/bookings
router.get('/', async (req, res) => {
  try {
    const hotelBookings = await HotelBooking.aggregate([
      { $group: { _id: '$hotel', totalBookings: { $sum: 1 } } },
      {
        $lookup: {
          from: 'hotels',
          localField: '_id',
          foreignField: '_id',
          as: 'hotelDetails'
        }
      },
      { $unwind: '$hotelDetails' },
      {
        $project: {
          name: '$hotelDetails.name',
          city: '$hotelDetails.city',
          totalBookings: 1
        }
      }
    ]);

    const restaurantBookings = await RestaurantBooking.aggregate([
      { $group: { _id: '$item', totalBookings: { $sum: 1 } } },
      {
        $lookup: {
          from: 'restaurants',
          localField: '_id',
          foreignField: '_id',
          as: 'restaurantDetails'
        }
      },
      { $unwind: '$restaurantDetails' },
      {
        $project: {
          name: '$restaurantDetails.name',
          city: '$restaurantDetails.city',
          totalBookings: 1
        }
      }
    ]);

    const guideBookings = await GuideBooking.aggregate([
      { $group: { _id: '$guide', totalBookings: { $sum: 1 } } },
      {
        $lookup: {
          from: 'tourguides',
          localField: '_id',
          foreignField: '_id',
          as: 'guideDetails'
        }
      },
      { $unwind: '$guideDetails' },
      {
        $project: {
          name: '$guideDetails.name',
          city: '$guideDetails.city',
          totalBookings: 1
        }
      }
    ]);

    res.json({
      hotelBookings,
      restaurantBookings,
      guideBookings
    });

  } catch (err) {
    console.error('Error fetching bookings data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
