import { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';  
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './Header.css';
import UserProfile from './UserProfile'; 

export default function Header({ isAuthenticated, onLoginSuccess, onLogoutClick }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setShowUserProfile(false);
    }
  }, [isAuthenticated]);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowSignUpForm(false); // Cache le formulaire d'inscription
  };

  const handleSignUpClick = () => {
    console.log('handleSignUpClick called');
    setShowSignUpForm(true);  // Affiche le formulaire d'inscription
    setShowLoginForm(false);  // Cache le formulaire de connexion
  };

  const handleProfileClick = () => {
    setShowUserProfile(!showUserProfile);
  };

  const handleLogout = () => {
    onLogoutClick();
    localStorage.removeItem('token');
    setShowUserProfile(false);
  };

  // Fonction pour gérer le succès de l'inscription
  const onSignUpSuccess = (token) => {
    console.log('Inscription réussie avec token:', token);
    // Actions supplémentaires après inscription réussie (comme stocker le token)
  };

  return (
    <header className="header">
      <h1 className="header-title">NextChapter</h1>
      {isAuthenticated ? (
        <div className="profile-section">
          <button className="profile-button" onClick={handleProfileClick}>
            <FaUser className="profile-icon" />
          </button>
          {showUserProfile && (
            <div className="user-profile-container">
              <UserProfile token={localStorage.getItem('token')} onClose={() => setShowUserProfile(false)} />
            </div>
          )}
        </div>
      ) : (
        <>
          <button className="header-button" onClick={handleLoginClick}>
            Connexion
          </button>
          {showLoginForm && (
            <div className={`login-form-container ${showLoginForm ? 'show' : ''}`}>
              <LoginForm
                onLoginSuccess={onLoginSuccess}
                onClose={() => setShowLoginForm(false)}
                onSignUpClick={handleSignUpClick}
              />
            </div>
          )}
          {showSignUpForm && (
            <div className={`sign-up-form-container ${showSignUpForm ? 'show' : ''}`}>
              <SignUpForm onClose={() => setShowSignUpForm(false)} onSignUpSuccess={onSignUpSuccess} />
            </div>
          )}
        </>
      )}
    </header>
  );
}
