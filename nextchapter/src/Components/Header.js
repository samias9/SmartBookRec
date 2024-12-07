import { useState } from 'react';
import { FaUser } from 'react-icons/fa';  // Import de l'icône de profil de React Icons
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './Header.css';
import UserProfile from './UserProfile'; // Import du nouveau composant

export default function Header({ isAuthenticated, onLoginSuccess, onLogoutClick }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false); // État pour afficher/masquer le menu profil
  const [showUserProfile, setShowUserProfile] = useState(false); // Nouvel état pour afficher le composant UserProfile

  const handleLoginClick = () => {
    setShowLoginForm((prev) => !prev);
  };

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
    setShowLoginForm(false); // Cache le formulaire de connexion si nécessaire
  };

  const handleProfileClick = () => {
    setShowUserProfile(!showUserProfile); // Afficher/masquer le composant UserProfile
  };

  const handleLogout = () => {
    onLogoutClick();
    setShowUserProfile(false); // Ferme le composant de profil après la déconnexion
  };

  return (
    <header className="header">
      <h1 className="header-title">NextChapter</h1>
      {isAuthenticated ? (
        <div className="profile-section">
          <button className="profile-button" onClick={handleProfileClick}>
            <FaUser className="profile-icon" /> {/* Affiche l'icône de profil */}
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
            <div className="sign-up-form-container">
              <SignUpForm onClose={() => setShowSignUpForm(false)} />
            </div>
          )}
        </>
      )}
    </header>
  );
}
