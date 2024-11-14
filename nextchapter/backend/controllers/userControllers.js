const User = require('../models/userModel'); // Assure-toi que le chemin est correct
const bcrypt = require('bcryptjs');

// Créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const { pseudo, password } = req.body;

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await User.findOne({ pseudo });
    if (existingUser) {
      return res.status(400).json({ message: 'Pseudo déjà utilisé.' });
    }

    // Hash le mot de passe avant de le stocker
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crée l'utilisateur
    const newUser = new User({
      pseudo,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.', error });
  }
};

// Modifier un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { pseudo, password } = req.body;

    // Hash le nouveau mot de passe, si fourni
    const updatedData = { pseudo };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    // Mets à jour l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.status(200).json({ message: 'Utilisateur mis à jour avec succès.', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.', error });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Supprime l'utilisateur
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    res.status(200).json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.', error });
  }
};
