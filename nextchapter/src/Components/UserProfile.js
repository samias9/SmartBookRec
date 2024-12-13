import { useState, useEffect } from 'react';
import { getUserInfo, updateUserGrade } from '../api';
import './UserProfile.css';

export default function UserProfile({ token, onClose }) {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setLoading(true);

      getUserInfo(token)
        .then(response => {
          console.log('Utilisateur récupéré:', response);
          if (response && response.pseudo) {
            setUserInfo(response);
            setError('');  
          } else {
            setError('Données utilisateur invalides.');
            setUserInfo(null);  
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des informations utilisateur:', error);
          setError('Impossible de récupérer les informations utilisateur.');
          setLoading(false);
        });
    }
  }, [token]);

  const handleChangeGrade = async (newGrade) => {
    if (!userInfo || !userInfo._id) {
      console.log("userInfo:", userInfo);  
      setError("L'utilisateur n'est pas chargé.");
      return;
    }
  
    console.log(`Tentative de changement de grade vers: ${newGrade}`);
  
    try {
      const response = await updateUserGrade(userInfo._id, newGrade, token);
  
      console.log('Réponse après modification de grade:', response);
  
      if (response && response.message) {
        setSuccessMessage(`Grade modifié avec succès : ${response.message}`);
        setUserInfo({ ...userInfo, grade: newGrade }); 
      } else {
        setError('La réponse du serveur ne contient pas de message valide.');
      }
    } catch (err) {
      console.error('Erreur lors du changement de grade:', err);
      setError(err.message || 'Une erreur s\'est produite.');
    }
  };


  if (loading) return <div>Chargement...</div>;

  return (
    <div className="user-profile">
      <h2>Profil de l'utilisateur</h2>
      <p>Nom : {userInfo?.pseudo || 'Non défini'}</p>
      <p>Grade : {userInfo?.grade || 'Non défini'}</p>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <div className="buttons">
        <button onClick={() => handleChangeGrade('premium')}>Passer au grade Premium</button>
        <button onClick={() => handleChangeGrade('basic')}>Passer au grade Basic</button>
        <button onClick={() => handleChangeGrade('free')}>Revenir au grade Free</button>
      </div>

      <button onClick={onClose}>Déconnexion</button>
    </div>
  );
}
