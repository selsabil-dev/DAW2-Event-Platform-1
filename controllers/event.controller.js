//Gère la logique métier pour les événements (création, récupération, mise à jour). Inclut des fonctions comme createEvent, getEvents, getEventDetails, addComite, addInvite
// controllers/event.controller.js
const { createEvent, addComiteMember, addInvite , getEvents} = require('../models/event.model');

const createEventController = async (req, res) => {
  const { titre, description, date_debut, date_fin, lieu, thematique, contact } = req.body;
  const id_organisateur = req.user.id; // Récupéré du token JWT via middleware

  // Données à insérer
  const eventData = {
    titre,
    description,
    date_debut,
    date_fin,
    lieu,
    thematique,
    contact,
    id_organisateur,
  };

  createEvent(eventData, (err, eventId) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la création de l\'événement' });
    }
    res.status(201).json({
      message: 'Événement créé avec succès',
      eventId,
    });
  });
};
const addComiteController = (req, res) => {
  const { eventId } = req.params;              // /api/events/:eventId/add-comite
  const { comiteId, membres } = req.body;      // membres = [userId1, userId2, ...]

  if (!Array.isArray(membres) || !comiteId) {
    return res.status(400).json({ message: 'comiteId et liste membres requis' });
  }

  let count = 0;
  let hasError = false;

  membres.forEach((userId) => {
    addComiteMember(comiteId, userId, (err) => {
      if (err && !hasError) {
        hasError = true;
        return res.status(500).json({ message: 'Erreur lors de l’ajout au comité' });
      }

      count++;
      if (count === membres.length && !hasError) {
        res.status(201).json({ message: 'Membres ajoutés au comité avec succès' });
      }
    });
  });
};
// Ajouter des invités à un événement
const addInviteController = (req, res) => {
  const { eventId } = req.params; // /api/events/:eventId/add-invite
  const { invites } = req.body;   // invites = [ { nom, prenom, email, sujet_conference }, ... ]

  if (!Array.isArray(invites) || invites.length === 0) {
    return res.status(400).json({ message: 'Liste des invités requise' });
  }

  let count = 0;
  let hasError = false;

  invites.forEach((inviteData) => {
    addInvite(eventId, inviteData, (err) => {
      if (err && !hasError) {
        hasError = true;
        return res.status(500).json({ message: "Erreur lors de l'ajout des invités" });
      }

      count++;
      if (count === invites.length && !hasError) {
        res.status(201).json({ message: 'Invités ajoutés avec succès' });
      }
    });
  });
};

const getEventsController = (req, res) => {
  const { status } = req.query; // ?status=upcoming ou ?status=archived

  getEvents(status, (err, events) => {
    if (err) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
    }
    res.json({ events });
  });
};
module.exports = { createEventController , addComiteController , addInviteController ,getEventsController,};