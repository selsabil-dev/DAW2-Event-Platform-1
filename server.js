const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');
const { verifyToken } = require('./middlewares/auth.middleware');

const app = express();
const port = process.env.PORT || 3000;

// Middleware pour logger les requêtes
app.use((req, res, next) => {
  console.log(` ${req.method} ${req.url}`);
  next();
});

// Middleware pour JSON
app.use(bodyParser.json());
app.use(express.json());

// Routes Auth
app.use('/api/auth', authRoutes);

// Route profil protégée
app.get('/api/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Profil accessible',
    user: req.user   // contient id, email, role
  });
});

// Route de test
app.get('/test', (req, res) => {
  res.json({ message: ' Serveur fonctionne correctement!' });
});

// Gestionnaire 404 (toujours en dernier)
app.use((req, res) => {
  res.status(404).json({
    message: ` Route non trouvée: ${req.method} ${req.originalUrl}`
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`\n Serveur Express démarré sur le port ${port}`);
  console.log(` Test: http://localhost:${port}/test`);
  console.log(` Register: http://localhost:${port}/api/auth/register`);
  console.log(` Login: http://localhost:${port}/api/auth/login\n`);
});