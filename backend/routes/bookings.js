const express = require('express');
const router = express.Router();
const { 
  createBooking, 
  getBookings, 
  getBookingById, 
  updateBooking, 
  cancelBooking 
} = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.post('/', auth, createBooking);
router.get('/', auth, getBookings);
router.get('/:id', auth, getBookingById);
router.put('/:id', auth, updateBooking);
router.delete('/:id', auth, cancelBooking);

module.exports = router;
