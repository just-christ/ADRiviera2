const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentification
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Authentification]
 *     summary: Inscription d'un nouveau membre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jean Dupont"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jean@example.com"
 *               password:
 *                 type: string
 *                 minLength: 8
 */
router.post('/register', register);

// Documentation similaire ajoutée pour /login
router.post('/login', login);

module.exports = router;