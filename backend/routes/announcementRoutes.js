const express = require('express');
const { getAnnouncements, createAnnouncement, getAnnouncementById, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAnnouncements);
router.post('/', auth, createAnnouncement);
router.get('/:id', auth, getAnnouncementById); // Nouvelle route
router.put('/:id', auth, updateAnnouncement); // Nouvelle route
router.delete('/:id', auth, deleteAnnouncement); // Nouvelle route

module.exports = router;