// backend/routes/eventRoutes.js
const express = require('express');
const {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController'); 
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getEvents);
router.post('/', auth, createEvent);
router.get('/:id', auth, getEventById);
router.put('/:id', auth, updateEvent);
router.delete('/:id', auth, deleteEvent);

module.exports = router;