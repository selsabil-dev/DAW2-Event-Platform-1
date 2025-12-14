const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// REGISTER
const register = async (req, res) => {
  let { nom, prenom, email, mot_de_passe, role, photo, institution, domaine_recherche } = req.body;

  // Rôle forcé côté serveur (sécurité)
  const allowedPublicRoles = ['PARTICIPANT', 'COMMUNICANT','ORGANISATEUR'];
  if (!allowedPublicRoles.includes(role)) {
    role = 'PARTICIPANT'; // par défaut
  }

  try {
    // Vérifier si l'email existe déjà
    db.query('SELECT * FROM utilisateur WHERE email = ?', [email], async (err, result) => {
      if (err) {
        console.error('Erreur DB:', err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: 'Email déjà utilisé' });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

      // Insertion en DB
      const sql = `
        INSERT INTO utilisateur 
          (nom, prenom, email, mot_de_passe, role, photo, institution, domaine_recherche)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [nom, prenom, email, hashedPassword, role, photo, institution, domaine_recherche],
        (err, resultInsert) => {
          if (err) {
            console.error('Erreur insertion:', err);
            return res
              .status(500)
              .json({ message: "Erreur serveur lors de l'inscription" });
          }

          res.status(201).json({
            message: 'Utilisateur créé avec succès',
            userId: resultInsert.insertId,
          });
        }
      );
    });
  } catch (error) {
    console.error('Erreur:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// LOGIN
const login = (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) {
    return res
      .status(400)
      .json({ message: 'Email et mot de passe requis' });
  }

  db.query('SELECT * FROM utilisateur WHERE email = ?', [email], async (err, result) => {
    if (err) {
      console.error('Erreur DB:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }

    if (result.length === 0) {
      return res
        .status(400)
        .json({ message: 'Email ou mot de passe incorrect' });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: 'Email ou mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Authentification réussie',
      token,
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        photo: user.photo,
        institution: user.institution,
        domaine_recherche: user.domaine_recherche,
      },
    });
  });
};

module.exports = { register, login };
