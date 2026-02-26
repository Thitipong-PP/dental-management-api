const express = require('express');

// Controller file
const {
    getBookings,
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/bookings');

// Router
const router = express.Router();

// Auth Middleware
const {protect, authorize} = require('../middleware/auth');

// Path and method
router.route('/')
    .get(protect, authorize('admin'), getBookings) // Only admin can get all booking
    .post(protect, authorize('user'), createBooking); // Only user can create booking

router.route('/:id')
    .get(protect, getBooking)
    .put(protect, updateBooking)
    .delete(protect, deleteBooking);

module.exports = router;