const express = require('express');
const { getAttendance, createAttendance, getAttendanceById, updateAttendance, deleteAttendance } = require('../controllers/attendanceController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAttendance);
router.post('/', auth, createAttendance);
router.get('/:id', auth, getAttendanceById);
router.put('/:id', auth, updateAttendance);
router.delete('/:id', auth, deleteAttendance);

module.exports = router;