const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');
const Restaurant = require('../models/Restaurant');
const Guide = require('../models/Guide');
const Spot = require('../models/Spot');



// POST /api/admin/addHotel
router.post('/addHotel', async (req, res) => {
  try {
    const { name, city, rating, feePerNight, image, description } = req.body;

    // Basic validation
    if (!name || !city || !rating || !feePerNight || !image || !description) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Create new hotel document
    const newHotel = new Hotel({
      name,
      city,
      rating,
      feePerNight,
      image,
      description
    });
    // Save hotel to MongoDB
    await newHotel.save();

    res.status(201).json({ message: 'Hotel added successfully' });

  } catch (error) {
    console.error('Error adding hotel:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/addRestaurant
router.post('/addRestaurant', async (req, res) => {
  try {
    const { name, city, cuisine, rating, image, description } = req.body;

    // Basic validation
    if (!name || !city || !cuisine || !rating || !image || !description) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // Create new restaurant document
    const newRestaurant = new Restaurant({
      name,
      city,
      cuisine,
      rating,
      image,
      description
    });

    // Save restaurant to MongoDB
    await newRestaurant.save();
     res.status(201).json({ message: 'Restaurant added successfully' });
  } catch (error) {
    console.error('Error adding restaurant:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/addGuide
router.post('/addGuide', async (req, res) => {
  try {
    const { name, city, rating, description, image, feePerTrip, language } = req.body;

    // Basic validation
    if (!name || !city || !rating || !description || !image || !feePerTrip || !language) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const newGuide = new Guide({
      name,
      city,
      rating,
      description,
      image,
      feePerTrip,
      language
    });
    await newGuide.save();

    res.status(201).json({ message: 'Guide added successfully' });

  } catch (error) {
    console.error('Error adding guide:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// POST /api/admin/addSpot
router.post('/addSpot', async (req, res) => {
  try {
    const { name, city, rating, description, image } = req.body;

    // Basic validation
    if (!name || !city || !rating || !description || !image) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    const newSpot = new Spot({
      name,
      city,
      rating,
      description,
      image
    });

    await newSpot.save();
    res.status(201).json({ message: 'Tourist spot added successfully' });

  } catch (error) {
    console.error('Error adding spot:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;

