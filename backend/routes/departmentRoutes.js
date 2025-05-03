const express = require('express');
const {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require('../controllers/departmentController.js');
const auth = require('../middleware/auth');

const router = express.Router();

// Routes pour les départements
router.get('/', auth, getAllDepartments);
router.get('/:id', auth, getDepartmentById);
router.post('/', auth, createDepartment);
router.put('/:id', auth, updateDepartment);
router.delete('/:id', auth, deleteDepartment);

module.exports = router;