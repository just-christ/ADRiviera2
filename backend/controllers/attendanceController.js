const { Attendance, Member, Event } = require('../models');

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findAll({ include: [Member, Event] });
    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createAttendance = async (req, res) => {
  const { status, memberId, eventId } = req.body;

  try {
    const attendance = await Attendance.create({ status, memberId, eventId });
    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Récupérer une présence par son ID
exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id, { include: [Member, Event] });
    if (!attendance) {
      return res.status(404).json({ message: 'Présence non trouvée' });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une présence
exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Présence non trouvée' });
    }
    await attendance.update(req.body);
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une présence
exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: 'Présence non trouvée' });
    }
    await attendance.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};