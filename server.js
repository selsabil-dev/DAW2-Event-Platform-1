const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');
const { verifyToken } = require('./middlewares/auth.middleware');
const eventRoutes = require('./routes/event.routes');
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(` ${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// CETTE ROUTE DOIT ÊTRE LÀ, AVANT LE 404
app.get('/api/profile', verifyToken, (req, res) => {
  res.json({
    message: 'Profil accessible',
    user: req.user
  });
});

app.get('/test', (req, res) => {
  res.json({ message: ' Serveur fonctionne correctement!' });
});

// 404 en dernier
app.use((req, res) => {
  res.status(404).json({
    message: ` Route non trouvée: ${req.method} ${req.originalUrl}`
  });
});

app.listen(port, () => {
  console.log(`\n Serveur Express démarré sur le port ${port}`);
  console.log(` Test: http://localhost:${port}/test`);
  console.log(` Register: http://localhost:${port}/api/auth/register`);
  console.log(` Login: http://localhost:${port}/api/auth/login\n`);
});
