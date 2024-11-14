const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const User = require('../models/userModel'); // Importation du modèle User

// Route pour créer un utilisateur
router.post('/create', userController.createUser);

// Route pour modifier un utilisateur
router.put('/update/:userId', userController.updateUser);

// Route pour supprimer un utilisateur
router.delete('/delete/:userId', userController.deleteUser);

// Route de test pour vérifier que le serveur fonctionne
router.get('/test', (req, res) => {
    res.status(200).json({ message: 'La route fonctionne correctement !' });
});

// Route pour récupérer tous les utilisateurs
router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
});

module.exports = router;
