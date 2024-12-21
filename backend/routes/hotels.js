const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

// Get all hotels
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all hotels...');
    const hotels = await Hotel.find();
    console.log(`Found ${hotels.length} hotels`);
    res.json(hotels);
  } catch (error) {
    console.error('Error in GET /hotels:', error);
    res.status(500).json({ message: 'Error fetching hotels' });
  }
});

// Get hotel by ID
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel not found' });
    }
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel details' });
  }
});

module.exports = router;
