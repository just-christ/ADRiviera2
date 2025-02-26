const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');
const Member = require('../models/Member');

const register = async (req, res) => {
  let { name, email, password, role } = req.body;
  if (role === "") {
    role = "1";
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const member = await Member.create({ name, email, password: hashedPassword, role });
    const token = generateToken(member.id, member.role);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const member = await Member.findOne({ where: { email } });
    if (!member) {
      return res.status(404).json({ error: 'Membre non trouvé.' });
    }

    const isPasswordValid = await bcrypt.compare(password, member.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Mot de passe incorrect.' });
    }

    const token = generateToken(member.id, member.role);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { register, login };