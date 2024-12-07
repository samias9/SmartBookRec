const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Récupérer le token après "Bearer"
  
  if (!token) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }

    req.userId = decoded.userId;  // Ajouter l'ID de l'utilisateur à la requête
    next();
  });
};

module.exports = authMiddleware;
