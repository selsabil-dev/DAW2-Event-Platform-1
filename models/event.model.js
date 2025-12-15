//Contient les requêtes SQL pour interagir avec les tables evenement, comite_scientifique, membre_comite, invite, session
// models/event.model.js
const db = require('../db');

const createEvent = (data, callback) => {
  const { titre, description, date_debut, date_fin, lieu, thematique, contact, id_organisateur } = data;
  const sql = `
    INSERT INTO evenement (titre, description, date_debut, date_fin, lieu, thematique, contact, id_organisateur)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [titre, description, date_debut, date_fin, lieu, thematique, contact, id_organisateur], (err, result) => {
    if (err) {
      console.error('Erreur insertion événement:', err);
      return callback(err, null);
    }
    callback(null, result.insertId); // Retourne l'ID de l'événement créé
  });
};
const addComiteMember = (comiteId, userId, callback) => {
  const sql = `
    INSERT INTO membre_comite (utilisateur_id, comite_id)
    VALUES (?, ?)
  `;

  db.query(sql, [userId, comiteId], (err, result) => {
    if (err) {
      console.error('Erreur insertion membre_comite:', err);
      return callback(err);
    }
    callback(null, result.insertId); // id de la ligne membre_comite
  });
};
const addInvite = (eventId, inviteData, callback) => {
  const { nom, prenom, email, sujet_conference } = inviteData;

  const sql = `
    INSERT INTO invite (nom, prenom, email, evenement_id, sujet_conference)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [nom, prenom, email, eventId, sujet_conference], (err, result) => {
    if (err) {
      console.error('Erreur insertion invite:', err);
      return callback(err);
    }
    callback(null, result.insertId); // id de l’invité
  });
};
// Récupérer les événements (option status: 'upcoming' ou 'archived')
const getEvents = (status, callback) => {
  let sql = 'SELECT id, titre, description, date_debut, date_fin, lieu, thematique FROM evenement';
  const params = [];

  if (status === 'upcoming') {
    sql += ' WHERE date_debut >= CURRENT_DATE()';
  } else if (status === 'archived') {
    sql += ' WHERE date_fin < CURRENT_DATE()';
  }

  sql += ' ORDER BY date_debut ASC';

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Erreur récupération événements:', err);
      return callback(err);
    }
    callback(null, results);
  });
};


module.exports = {
  createEvent,
  addComiteMember,
  addInvite,
  getEvents,

};
