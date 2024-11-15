const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importation de cors
require('dotenv').config();

const app = express();

// Configuration de CORS
app.use(cors({
  origin: 'http://localhost:3000', // Autorise les requêtes depuis le frontend (localhost:3000)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
}));

app.use(express.json());

const userRoutes = require('./routes/userRoute');
app.use('/api/users', userRoutes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.error("Erreur de connexion à MongoDB :", error));

app.listen(5000, () => {
  console.log("Serveur démarré sur le port 5000");
});
