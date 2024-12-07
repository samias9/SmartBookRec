const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
      password: hashedPassword,
      grade: 'free'  // Par défaut, l'utilisateur est créé avec le grade "free"
    });
    await newUser.save();
    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.', error });
  }
};

// Login utilisateur
exports.loginUser = async (req, res) => {
  try {
    const { pseudo, password } = req.body;
    // Vérifie si l'utilisateur existe
    const user = await User.findOne({ pseudo });
    if (!user) {
      return res.status(400).json({ message: 'Pseudo ou mot de passe incorrect.' });
    }
    // Vérifie le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Pseudo ou mot de passe incorrect.' });
    }
    // Crée un token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Connexion réussie.', token });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion.', error });
  }
};

// Logout utilisateur
exports.logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: 'Déconnexion réussie.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la déconnexion.', error });
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

// Promouvoir un utilisateur au grade Premium
exports.promoteToPremium = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    // Si l'utilisateur est déjà premium, on ne fait rien
    if (user.grade === 'premium') {
      return res.status(400).json({ message: 'L\'utilisateur est déjà au grade Premium.' });
    }
    // Met à jour le grade de l'utilisateur
    user.grade = 'premium';
    await user.save();
    res.status(200).json({ message: 'Utilisateur promu au grade Premium avec succès.', user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la promotion de l\'utilisateur.', error });
  }
};

// Promouvoir un utilisateur au grade Premium
exports.promoteToBasic = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    // Si l'utilisateur est déjà premium, on ne fait rien
    if (user.grade === 'basic') {
      return res.status(400).json({ message: 'L\'utilisateur est déjà au grade Basic.' });
    }
    // Met à jour le grade de l'utilisateur
    user.grade = 'basic';
    await user.save();
    res.status(200).json({ message: 'Utilisateur promu au grade Basic avec succès.', user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la promotion de l\'utilisateur.', error });
  }
};

// Rétrograder un utilisateur vers Basic
exports.demoteToBasic = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    // Si l'utilisateur est déjà au grade Basic, on ne fait rien
    if (user.grade === 'basic') {
      return res.status(400).json({ message: 'L\'utilisateur est déjà au grade Basic.' });
    }
    // Rétrograde l'utilisateur vers Basic
    user.grade = 'basic';
    await user.save();
    res.status(200).json({ message: 'Utilisateur rétrogradé au grade Basic avec succès.', user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la rétrogradation de l\'utilisateur.', error });
  }
};

// Rétrograder un utilisateur vers Free
exports.demoteToFree = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    // Si l'utilisateur est déjà au grade Free, on ne fait rien
    if (user.grade === 'free') {
      return res.status(400).json({ message: 'L\'utilisateur est déjà au grade Free.' });
    }
    // Rétrograde l'utilisateur vers Free
    user.grade = 'free';
    await user.save();
    res.status(200).json({ message: 'Utilisateur rétrogradé au grade Free avec succès.', user });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la rétrogradation de l\'utilisateur.', error });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({
      pseudo: user.pseudo,
      grade: user.grade,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};
