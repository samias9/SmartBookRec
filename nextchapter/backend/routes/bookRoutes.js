
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Book = require('../models/bookModel');

 router.post('/search', async (req, res) => {
  const { author } = req.body;

  try {
    console.log('Auteur reçu :', author);
    if (!author) throw new Error('Le champ auteur est vide.');

    console.log('Connexion MongoDB en cours...');
    const testConnection = await mongoose.connection.db.admin().ping();
    console.log('Connexion MongoDB testée avec succès :', testConnection);

    console.log('Recherche des livres dans la collection...');
    const books = await Book.find({ authors: { $regex: author, $options: 'i' } });
    console.log('Livres trouvés :', books);

    res.status(200).json(books);
  } catch (error) {
    console.error('Erreur lors de la recherche dans MongoDB :', error.message);
    res.status(500).json({ message: 'Erreur lors de la recherche des livres', error });
  }
});

router.post('/api/books/searchByGenre', async (req, res) => {
  const { genre } = req.body;

  try {
    let books;

    if (genre) {
      books = await Book.find({ genre: { $regex: genre, $options: 'i' } });
    } else {
      books = await Book.find({});
    }

    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
});


router.post('/api/books/searchBySynopsis', async (req, res) => {
  const { synopsis } = req.body; 
  
  try {
    const books = await Book.find({ description: { $regex: synopsis, $options: 'i' } });
    res.json(books);
  } catch (error) {
    console.error('Erreur serveur :', error.message);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
});


module.exports = router;