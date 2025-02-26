const express = require('express');
const {
  getAllGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
} = require('../controllers/groupController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getAllGroups);
router.get('/:id', auth, getGroupById);
router.post('/', auth, createGroup);
router.put('/:id', auth, updateGroup);
router.delete('/:id', auth, deleteGroup);

module.exports = router;