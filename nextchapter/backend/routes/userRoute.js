const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware'); 
const jwt = require('jsonwebtoken');

router.post('/create', userController.createUser);

router.put('/update/:userId', userController.updateUser);

router.delete('/delete/:userId', userController.deleteUser);

router.post('/login', userController.loginUser);

router.post('/logout', userController.logoutUser);

router.get('/test', (req, res) => {
    res.status(200).json({ message: 'La route fonctionne correctement !' });
});

router.get('/all', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error });
    }
});

router.get('/me', authMiddleware, userController.getUserInfo);
router.patch('/users/:userId/grade', authMiddleware, userController.updateUserGrade);

module.exports = router;
