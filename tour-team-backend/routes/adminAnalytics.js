const express = require('express');
const router = express.Router();
const HotelBooking = require('../models/HotelBooking');
const GuideBooking = require('../models/GuideBooking');
const RestaurantBooking = require('../models/RestaurantBooking');
const Hotel = require('../models/Hotel');
const Restaurant = require('../models/Restaurant');
const Guide = require('../models/Guide');
const RestaurantReview = require('../models/RestaurantReview');
const HotelReview = require('../models/HotelReview');
const GuideReview = require('../models/GuideReview');

// Helper to get first day of a month (default current month)
function getMonthStartDate(year, month) {
  return new Date(year, month, 1);
}

// Helper to get first day of next month
function getNextMonthStartDate(year, month) {
  return new Date(year, month + 1, 1);
}
// GET /api/admin/earnings?year=2025&month=4  (April 2025)
router.get('/earnings', async (req, res) => {
  try {
    // Use query params or default to current month
    const year = parseInt(req.query.year) || new Date().getFullYear();
    const month = parseInt(req.query.month) - 1 || new Date().getMonth(); // zero-based month

    const startDate = getMonthStartDate(year, month);
    const endDate = getNextMonthStartDate(year, month);

    // Aggregate earnings from Hotel Bookings
    const hotelAgg = await HotelBooking.aggregate([
      { $match: { createdAt: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: null, totalCost: { $sum: "$cost" } } }
    ]);// Aggregate earnings from Guide Bookings
    const guideAgg = await GuideBooking.aggregate([
      { $match: { createdAt: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: null, totalCost: { $sum: "$feePerTrip" } } }
    ]);

    // Aggregate earnings from Restaurant Bookings
    const restaurantAgg = await RestaurantBooking.aggregate([
      { $match: { createdAt: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: null, totalCost: { $sum: "$cost" } } }
    ]);

    // Extract totals or default to zero
    const hotelTotal = hotelAgg.length ? hotelAgg[0].totalCost : 0;
    const guideTotal = guideAgg.length ? guideAgg[0].totalCost : 0;
    const restaurantTotal = restaurantAgg.length ? restaurantAgg[0].totalCost : 0; // Calculate platform earnings (10% cut)
    const hotelEarnings = hotelTotal * 0.10;
    const guideEarnings = guideTotal * 0.10;
    const restaurantEarnings = restaurantTotal * 0.10;

    const totalEarnings = hotelEarnings + guideEarnings + restaurantEarnings;

    res.json({
      month: month + 1,
      year,
      earnings: {
        hotel: hotelEarnings.toFixed(2),
        guide: guideEarnings.toFixed(2),
        restaurant: restaurantEarnings.toFixed(2),
        total: totalEarnings.toFixed(2)
      }
    });

  } catch (error) {
    console.error("Error fetching earnings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Helper function to get top booked items
const getTopBooked = async (BookingModel, RefModel, foreignKey) => {
  const bookings = await BookingModel.aggregate([
    { $group: { _id: `$${foreignKey}`, bookings: { $sum: 1 } } },
    {
      $lookup: {
        from: RefModel.collection.collectionName,
        localField: '_id',
        foreignField: '_id',
        as: 'details'
      }
    },
    { $unwind: '$details' },
    {
      $project: {
        name: '$details.name',
        bookings: 1
      }
    },
    { $sort: { bookings: -1 } },
    { $limit: 5 }
  ]);

  return bookings;
};


// Helper function to get top rated items
const getTopRated = async (ReviewModel, refModel, refFieldName) => {
  const ratings = await ReviewModel.aggregate([
    { $group: { _id: `$${refFieldName}`, rating: { $avg: "$stars" } } },
    {
      $lookup: {
        from: refModel.collection.collectionName,
        localField: '_id',
        foreignField: '_id',
        as: 'details'
      }
    },
    { $unwind: '$details' },
    {
      $project: {
        name: '$details.name',
        rating: 1
      }
    },
    { $sort: { rating: -1 } },
    { $limit: 5 }
  ]);

  return ratings;
};

// GET /api/admin/analytics
router.get('/analytics', async (req, res) => {
  try {
    // Top 5 booked items for hotels, restaurants, and guides
    const topBookedHotels = await getTopBooked(HotelBooking,Hotel, 'hotel');
    const topBookedRestaurants = await getTopBooked(RestaurantBooking, Restaurant,'item');
    const topBookedGuides = await getTopBooked(GuideBooking, Guide,'guide');

    // Top 5 rated items for hotels, restaurants, and guides
    const topRatedHotels = await getTopRated(HotelReview, Hotel, 'hotel');
    const topRatedRestaurants = await getTopRated(RestaurantReview,Restaurant, 'restaurant');
    const topRatedGuides = await getTopRated(GuideReview,Guide, 'guide');

    res.json({
      topBookedHotels,
      topRatedHotels,
      topBookedRestaurants,
      topRatedRestaurants,
      topBookedGuides,
      topRatedGuides
    });
  } catch (err) {
    console.error('Error fetching analytics data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});




module.exports = router;



