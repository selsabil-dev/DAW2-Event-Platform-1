// validators/inscription.validators.js
const { body, validationResult } = require('express-validator');

const validateInscription = [
  body('eventId')
    .isInt({ min: 1 })
    .withMessage('eventId doit être un entier positif'),
  body('userId')
    .isInt({ min: 1 })
    .withMessage('userId doit être un entier positif'),
  body('profil')
    .isIn(['participant', 'communicant', 'visiteur'])
    .withMessage('profil invalide'),

  // middleware pour renvoyer les erreurs si besoin
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateInscription,
};
