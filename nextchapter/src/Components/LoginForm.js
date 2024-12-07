import { useState } from 'react';
import { loginUser } from '../api';
import './LoginForm.css';

export default function LoginForm({ onLoginSuccess, onClose, onSignUpClick }) {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Données envoyées au backend :', { pseudo, password });

    try {
      const data = await loginUser(pseudo, password);
      console.log('Réponse reçue du backend :', data);

      const { token } = data;
      onLoginSuccess(token); // Si succès
      onClose();
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      setErrorMessage('Pseudo ou mot de passe incorrect.');
    }
  };

  return (
    <div className="login-form">
      <h2>Connexion</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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
          <button className="style button" type="submit">Se connecter</button>
          <button className="style button" type="button" onClick={onClose}>Annuler</button>
        </div>
      </form>
      <div className="sign-up-link">
        <span>Pas de compte ? <span className="link-text" onClick={onSignUpClick}>Créez-en un ici</span></span>
      </div>
    </div>
  );
}