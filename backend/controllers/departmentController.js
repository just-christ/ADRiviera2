const { Department, Group } = require('../models');
const asyncHandler = require('../middleware/asyncHandler');

// @desc    Récupérer tous les départements
// @route   GET /api/departments
// @access  Privé
exports.getAllDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.findAll({
    include: [{
      model: Group,
      as: 'groups'
    }]
  });
  
  res.status(200).json({
    success: true,
    count: departments.length,
    data: departments
  });
});

// @desc    Récupérer un département par ID
// @route   GET /api/departments/:id
// @access  Privé
exports.getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findByPk(req.params.id, {
    include: [{
      model: Group,
      as: 'groups'
    }]
  });
  
  if (!department) {
    return res.status(404).json({
      success: false,
      message: `Département avec l'ID ${req.params.id} non trouvé`
    });
  }
  
  res.status(200).json({
    success: true,
    data: department
  });
});

// @desc    Créer un nouveau département
// @route   POST /api/departments
// @access  Privé
exports.createDepartment = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({
      success: false,
      message: 'Le nom du département est requis'
    });
  }
  
  const department = await Department.create({
    name,
    description
  });
  
  res.status(201).json({
    success: true,
    data: department
  });
});

// @desc    Mettre à jour un département
// @route   PUT /api/departments/:id
// @access  Privé
exports.updateDepartment = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  
  // Vérifier si le département existe
  const department = await Department.findByPk(req.params.id);
  
  if (!department) {
    return res.status(404).json({
      success: false,
      message: `Département avec l'ID ${req.params.id} non trouvé`
    });
  }
  
  // Mettre à jour le département
  department.name = name || department.name;
  department.description = description !== undefined ? description : department.description;
  
  await department.save();
  
  res.status(200).json({
    success: true,
    data: department
  });
});

// @desc    Supprimer un département
// @route   DELETE /api/departments/:id
// @access  Privé
exports.deleteDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  
  if (!department) {
    return res.status(404).json({
      success: false,
      message: `Département avec l'ID ${req.params.id} non trouvé`
    });
  }
  
  await department.destroy();
  
  res.status(200).json({
    success: true,
    message: 'Département supprimé avec succès'
  });
});