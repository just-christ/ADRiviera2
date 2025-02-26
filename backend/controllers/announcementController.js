const { Announcement, Member } = require('../models');

// Récupérer toutes les annonces avec pagination
exports.getAnnouncements = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Pagination
  const offset = (page - 1) * limit;

  try {
    const { count, rows: announcements } = await Announcement.findAndCountAll({
      include: Member, // Inclure les informations de l'auteur
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']], // Trier par date de création (du plus récent au plus ancien)
    });

    res.status(200).json({
      total: count,
      page: parseInt(page),
      limit: parseInt(limit),
      announcements,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Créer une nouvelle annonce
exports.createAnnouncement = async (req, res) => {
  const { title, content } = req.body;

  // Validation des données
  if (!title || !content) {
    return res.status(400).json({ message: 'Le titre et le contenu sont obligatoires' });
  }

  try {
    const announcement = await Announcement.create({
      title,
      content,
      authorId: req.user.userId, // Associer l'annonce à l'utilisateur authentifié
    });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Récupérer une annonce par son ID
exports.getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id, { include: Member });
    if (!announcement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour une annonce
exports.updateAnnouncement = async (req, res) => {
  const { title, content } = req.body;

  // Validation des données
  if (!title && !content) {
    return res.status(400).json({ message: 'Aucune donnée à mettre à jour' });
  }

  try {
    const announcement = await Announcement.findByPk(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    // Vérifier que l'utilisateur est l'auteur de l'annonce
    if (announcement.authorId !== req.user.userId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier cette annonce' });
    }

    // Mettre à jour les champs
    if (title) announcement.title = title;
    if (content) announcement.content = content;

    await announcement.save();
    res.status(200).json(announcement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une annonce
exports.deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id);
    if (!announcement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    // Vérifier que l'utilisateur est l'auteur de l'annonce
    if (announcement.authorId !== req.user.userId) {
      return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer cette annonce' });
    }

    await announcement.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};