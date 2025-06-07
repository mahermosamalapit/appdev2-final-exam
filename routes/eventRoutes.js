const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  createEvent,
  getMyEvents
} = require('../controllers/eventController');
const auth = require('../middleware/authMiddleware');

// Public route
router.get('/', getAllEvents);

// Protected routes
router.post('/', auth, createEvent);
router.get('/my-events', auth, getMyEvents);

module.exports = router;