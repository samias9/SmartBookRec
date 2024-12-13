import { useState } from 'react';
import { createUser } from '../api'; 
import './SignUpForm.css';

export default function SignUpForm({ onClose }) {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await createUser(pseudo, password);
      console.log('Utilisateur créé :', response);
      onClose(); 
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur :', error);
      setErrorMessage('Erreur lors de la création de votre compte. Veuillez réessayer.');
    }
  };

  return (
    <div className="sign-up-form">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pseudo :</label>
          <input
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-buttons">
          <button className="style button" type="submit">Créer un compte</button>
          <button className="style button" type="button" onClick={onClose}>Annuler</button>
        </div>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}
