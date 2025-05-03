const { Member, Group, Role } = require("../models");
const bcrypt = require("bcrypt");

// Validation des champs obligatoires à la création
const REQUIRED_FIELDS = [
  'name', 
  'email', 
  'password', 
  'gender', 
  'birth_date',
  'contact'
];

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.findAll({ 
      include: [
        { model: Group },
        { model: Role, as: 'globalRole' }
      ],
      attributes: { exclude: ['password'] } 
    });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Erreur de récupération des membres" });
  }
};

exports.createMember = async (req, res) => {
  const missingFields = REQUIRED_FIELDS.filter(field => !req.body[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Champs manquants",
      missing: missingFields
    });
  }

  try {
    const { email } = req.body;
    
    // Vérification de l'unicité de l'email
    const exists = await Member.findOne({ where: { email } });
    if (exists) {
      return res.status(409).json({ error: "Cet email est déjà utilisé" });
    }

    // Hachage sécurisé du mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    
    const newMember = {
      ...req.body,
      password: hashedPassword,
      roleId: 1, 
      baptism_location: req.body.baptism_location || null,
      belongs_to_group: Boolean(req.body.groupId) 
    };

    const member = await Member.create(newMember);
    
    // Ne pas renvoyer le mot de passe dans la réponse
    const { password, ...safeMember } = member.get({ plain: true });
    res.status(201).json(safeMember);

  } catch (error) {
    res.status(400).json({
      error: "Erreur de création",
      details: error.errors?.map(e => e.message)
    });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id, {
      include: [
        { model: Group },
        { model: Role, as: 'globalRole' }
      ],
      attributes: { exclude: ['password'] }
    });

    member 
      ? res.status(200).json(member)
      : res.status(404).json({ error: "Membre non trouvé" });

  } catch (error) {
    res.status(500).json({ error: "Erreur de recherche" });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByPk(req.params.id);
    
    const updates = {
      gender: req.body.gender,
      birth_date: req.body.birth_date,
      is_church_member: req.body.is_church_member,
      is_baptized: req.body.is_baptized,
      baptism_date: req.body.baptism_date,
      baptism_location: req.body.baptism_location
    };

    await member.update(updates);
    
    const { password, ...safeMember } = member.toJSON();
    res.json(safeMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const deleted = await Member.destroy({
      where: { id: req.params.id },
      limit: 1
    });

    deleted 
      ? res.status(204).end()
      : res.status(404).json({ error: "Membre non trouvé" });

  } catch (error) {
    res.status(500).json({ error: "Échec de suppression" });
  }
};