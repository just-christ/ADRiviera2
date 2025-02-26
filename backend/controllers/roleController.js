const { Role } = require('../models');

// Récupérer tous les rôles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer un rôle par son ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Rôle non trouvé' });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un nouveau rôle
exports.createRole = async (req, res) => {
  const { name, description } = req.body;

  // Validation des données
  if (!name) {
    return res.status(400).json({ message: 'Le nom du rôle est obligatoire' });
  }

  try {
    const role = await Role.create({ name, description });
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un rôle
exports.updateRole = async (req, res) => {
  const { name, description } = req.body;

  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Rôle non trouvé' });
    }

    // Mettre à jour les champs
    role.name = name || role.name;
    role.description = description || role.description;

    await role.save();
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un rôle
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) {
      return res.status(404).json({ message: 'Rôle non trouvé' });
    }

    await role.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};