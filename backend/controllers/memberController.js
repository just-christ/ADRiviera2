const { Member, Group } = require('../models');
const bcrypt = require('bcrypt');

// Récupérer tous les membres avec leurs groupes
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.findAll({ include: Group });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer un nouveau membre avec un rôle par défaut (Membre = ID 1)
exports.createMember = async (req, res) => {
  const { name, email, password, groupId } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const member = await Member.create({
      name,
      email,
      password: hashedPassword,
      roleId: 1,  // Forçage du rôle "Membre" avec ID 1
      groupId: groupId || null  // Si groupId est vide, on met null
    });

    res.status(201).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Récupérer un membre par son ID
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id, { include: Group });
    if (!member) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour un membre
exports.updateMember = async (req, res) => {
  const { name, email, password, role, groupId } = req.body;

  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }

    // Mettre à jour les champs
    member.name = name || member.name;
    member.email = email || member.email;
    member.role = role || member.role;
    member.groupId = groupId || member.groupId;

    // Hacher le mot de passe si fourni
    if (password) {
      member.password = await bcrypt.hash(password, 10);
    }

    await member.save();
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un membre
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Membre non trouvé' });
    }
    await member.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};