const express = require('express');
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} = require('../controllers/roleController');
const auth = require('../middleware/auth');

const router = express.Router();

// Routes pour les rôles
router.get('/', auth, getAllRoles);
router.get('/:id', auth, getRoleById);
router.post('/', auth, createRole);
router.put('/:id', auth, updateRole);
router.delete('/:id', auth, deleteRole);

module.exports = router;