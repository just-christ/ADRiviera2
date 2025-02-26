const express = require('express');
const { getMembers, createMember, getMemberById, updateMember, deleteMember } = require('../controllers/memberController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getMembers);
router.post('/', auth, createMember);
router.get('/:id', auth, getMemberById); 
router.put('/:id', auth, updateMember); 
router.delete('/:id', auth, deleteMember); 

module.exports = router;