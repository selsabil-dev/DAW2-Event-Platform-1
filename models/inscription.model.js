// models/inscription.model.js
const db = require('../db');
const { v4: uuidv4 } = require('uuid'); // pour les badges

// Enregistrer une inscription de base (quel que soit le profil)
const registerInscription = (eventId, userId, profil, callback) => {
  // Générer un badge unique
  const badge = uuidv4();

  const sql = `
    INSERT INTO inscription (
      participant_id,
      evenement_id,
      statut_paiement,
      badge,
      date_inscription
    )
    VALUES (?, ?, 'a_payer', ?, CURRENT_DATE())
  `;

  db.query(sql, [userId, eventId, badge], (err, result) => {
    if (err) {
      console.error('Erreur insertion inscription:', err);
      return callback(err, null);
    }

    // On renvoie l'id de l'inscription + le badge généré (pratique côté contrôleur)
    callback(null, {
      inscriptionId: result.insertId,
      badge,
    });
  });
};

// Optionnel : autres fonctions selon le profil plus tard
module.exports = {
  registerInscription,
};
