const express = require('express');
const { getAnnouncements, createAnnouncement, getAnnouncementById, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAnnouncements);
router.post('/', auth, createAnnouncement);
router.get('/:id', auth, getAnnouncementById); 
router.put('/:id', auth, updateAnnouncement); 
router.delete('/:id', auth, deleteAnnouncement); 

module.exports = router;