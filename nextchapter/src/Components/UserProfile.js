import React, { useState, useEffect } from 'react';
import { getUserInfo } from '../api'; // Importez la fonction d'API

export default function UserProfile({ token, onClose }) {
  const [userInfo, setUserInfo] = useState({ pseudo: '', grade: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo(token); // Utilisez la fonction d'API
        setUserInfo(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur de récupération des informations');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [token]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="user-profile">
      <h2>Profil de l'utilisateur</h2>
      <p>Nom: {userInfo.pseudo}</p>
      <p>Grade: {userInfo.grade}</p>
      <button onClick={onClose}>Fermer</button>
    </div>
  );
}
