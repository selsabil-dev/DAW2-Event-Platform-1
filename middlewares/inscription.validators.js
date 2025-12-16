const { body } = require('express-validator');

// Validation commune (profil obligatoire)
const baseInscriptionValidation = [
  body('profil')
    .notEmpty().withMessage('Le profil est requis')
    .isIn(['participant', 'communicant', 'invite'])
    .withMessage('Profil invalide'),
];

// Validation pour participant
const participantValidation = [
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('prenom').notEmpty().withMessage('Le prénom est requis'),
  body('email').isEmail().withMessage('Email invalide'),
];

// Validation pour communicant
const communicantValidation = [
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('prenom').notEmpty().withMessage('Le prénom est requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('titre_communication')
    .notEmpty()
    .withMessage('Le titre de la communication est requis'),
];

// Validation pour invité
const inviteValidation = [
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('prenom').notEmpty().withMessage('Le prénom est requis'),
  body('email').optional().isEmail().withMessage('Email invalide'),
  body('statut')
    .notEmpty().withMessage('Le statut est requis')
    .isIn(['vip', 'media'])
    .withMessage('Statut invalide'),
];

// Middleware qui choisit la bonne validation selon profil
const inscriptionValidationByProfile = (profil) => {
  switch (profil) {
    case 'participant':
      return [...baseInscriptionValidation, ...participantValidation];
    case 'communicant':
      return [...baseInscriptionValidation, ...communicantValidation];
    case 'invite':
      return [...baseInscriptionValidation, ...inviteValidation];
    default:
      return baseInscriptionValidation;
  }
};

module.exports = {
  inscriptionValidationByProfile,
};
