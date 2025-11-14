const http = require('http');

const server = http.createServer((req, res) => {
  res.write('Bienvenue sur mon serveur Node.js 🚀');
  res.end();
});

server.listen(3000, () => {
  console.log("Serveur démarré sur http://localhost:3000");
});
 zxn zjnxiixxxxxxz]