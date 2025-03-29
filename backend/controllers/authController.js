const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const Member = require('../models/Member');

// Génération unique du token JWT
const generateToken = (userId, roleId) => {
  return jwt.sign(
    { id: userId, roleId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

const register = async (req, res) => {
  const { name, email: rawEmail, password } = req.body;
  const email = rawEmail.toLowerCase().trim();
  
  console.log("Données reçues :", { name, email }); // Log sécurisé

  if (!name || !email || !password) {
    console.log("Champs manquants dans la requête");
    return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
  }

  try {
    console.log(`Recherche de l'email existant : ${email}`);
    const existingMember = await Member.findOne({ 
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('email')),
        email.toLowerCase()
      )
    });
    
    if (existingMember) {
      console.log("Email déjà utilisé :", email);
      return res.status(409).json({ error: 'Cet email est déjà utilisé' });
    }

    console.log("Hachage du mot de passe...");
    const hashedPassword = await bcrypt.hash(password, 12);
    
    console.log("Création du membre...");
    const member = await Member.create({
      name,
      email,
      password: hashedPassword,
      roleId: 1
    });

    const token = generateToken(member.id, member.roleId);
    console.log("Inscription réussie pour :", member.email);
    
    res.status(201).json({ 
      token, 
      userId: member.id,
      message: 'Inscription réussie'
    });

  } catch (error) {
    console.error("Erreur d'inscription :", error);
    res.status(500).json({ 
      error: 'Erreur lors de l\'inscription',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const login = async (req, res) => {
  const { email: rawEmail, password } = req.body;
  const email = rawEmail.toLowerCase().trim();
  
  console.log("Tentative de connexion pour :", email);
  
  try {
    console.log(`Recherche du membre : ${email}`);
    const member = await Member.findOne({ 
      where: Sequelize.where(
        Sequelize.fn('LOWER', Sequelize.col('email')),
        email
      )
    });
    
    if (!member) {
      console.log("Email non trouvé :", email);
      return res.status(404).json({ error: 'Compte non trouvé' });
    }

    console.log("Vérification du mot de passe...");
    const validPassword = await bcrypt.compare(password, member.password);
    
    if (!validPassword) {
      console.log("Mot de passe incorrect pour :", email);
      return res.status(401).json({ error: 'Identifiants incorrects' });
    }

    const token = generateToken(member.id, member.roleId);
    console.log("Connexion réussie pour :", member.email);
    
    res.json({ 
      token, 
      userId: member.id,
      email: member.email,
      name: member.name
    });

  } catch (error) {
    console.error("Erreur de connexion :", error);
    res.status(500).json({ 
      error: 'Connexion échouée',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { register, login };