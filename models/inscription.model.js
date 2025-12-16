const db = require('../db');
const { v4: uuidv4 } = require('uuid'); // servira plus tard pour les badges

// Enregistrer une inscription de base (quel que soit le profil)
const registerInscription = (eventId, userId, profil, callback) => {
  const sql = `
    INSERT INTO inscription (participant_id, evenement_id, statut_paiement, badge, date_inscription)
    VALUES (?, ?, 'a_payer', NULL, CURRENT_DATE())
  `;
  db.query(sql, [userId, eventId], (err, result) => {
    if (err) {
      console.error('Erreur insertion inscription:', err);
      return callback(err, null);
    }
    callback(null, result.insertId);
  });
};

// Optionnel : si tu veux stocker des infos spécifiques selon profil,
// tu pourras ajouter ici d'autres fonctions (ex: registerCommunicantDetails, etc.)

module.exports = {
  registerInscription,
};
