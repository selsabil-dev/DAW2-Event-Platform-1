// routes/inscription.routes.js
const express = require('express');
const router = express.Router();

const inscriptionController = require('../controllers/inscription.controller');
// si tu as un validateur :
const { validateInscription } = require('../validators/inscription.validators');

// Route pour créer une inscription
router.post(
  '/inscription',
  validateInscription,            // enlève cette ligne si tu n’utilises pas de validator
  inscriptionController.registerInscription
);

module.exports = router;
