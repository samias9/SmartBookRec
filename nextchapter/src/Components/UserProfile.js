import { useState, useEffect } from 'react';
import { getUserInfo } from '../api'; // Assure-toi que cette fonction existe et est bien importée
import './UserProfile.css'

export default function UserProfile({ token, onClose }) {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (token) {
      console.log("Fetching user info with token:", token);
      getUserInfo(token)
        .then(response => {
          console.log("User info fetched:", response);
          setUserInfo(response);
        })
        .catch(error => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [token]);

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <h2>Profil de l'utilisateur</h2>
      {/* Affichage de pseudo et grade à la place de name et email */}
      <p>Nom : {userInfo.pseudo}</p>  {/* Utilise 'pseudo' au lieu de 'name' */}
      <p>Grade : {userInfo.grade}</p>  {/* Utilise 'grade' au lieu de 'email' */}
      <button onClick={onClose}>Déconnexion</button>
    </div>
  );
}
