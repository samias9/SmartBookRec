const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config();
require('dotenv').config({ path: './backend/.env' });

const app = express();


app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));

//j'ai ajouté app.use(cors()); 
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoute');
const bookRoutes = require('./routes/bookRoutes');

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.error("Erreur de connexion à MongoDB :", error));

app.listen(5000, () => {
  console.log("Serveur démarré sur le port 5000");
});
/*
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.error("Erreur de connexion à MongoDB :", error));

  const PORT = process.env.PORT || 5002;

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/
