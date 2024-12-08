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
  const [isProfileVisible, setIsProfileVisible] = useState(false); // State for profile visibility

  useEffect(() => {
    console.log('useEffect triggered: Checking authentication');
    if (!localStorage.getItem('token')) {
      console.log('No token found, hiding user profile');
      setShowUserProfile(false);
      setIsProfileVisible(false);  // Hide profile when not authenticated
    } else {
      console.log('Token found, profile should be visible');
      setShowUserProfile(true); // Show profile when authenticated
    }
  }, [isAuthenticated]);

  const handleLoginClick = () => {
    console.log('Login button clicked');
    setShowLoginForm(true);
    setShowSignUpForm(false); // Hide signup form
  };

  const handleSignUpClick = () => {
    console.log('Sign up button clicked');
    setShowSignUpForm(true);  // Show signup form
    setShowLoginForm(false);  // Hide login form
  };

  const handleProfileClick = () => {
    console.log('Profile button clicked');
    setShowUserProfile(true);
    setIsProfileVisible(prevState => {
      console.log('Previous state of isProfileVisible: ', prevState);
      return !prevState;  // Toggle profile visibility
    });
  };

  const handleLogout = () => {
    console.log('Logout button clicked');
    onLogoutClick();
    localStorage.removeItem('token');
    setIsProfileVisible(false);  // Hide profile on logout
    setTimeout(() => {
      setShowUserProfile(false); // Hide user profile after transition delay
      console.log('User profile is now hidden');
    }, 300); // Delay to allow transition
  };

  // Function to handle successful signup
  const onSignUpSuccess = (token) => {
    console.log('Signup successful with token:', token);
    // Additional actions after successful signup (e.g., store token)
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
            <div className={`user-profile-container ${isProfileVisible ? 'show' : ''}`}>
              <UserProfile 
                token={localStorage.getItem('token')} 
                onClose={() => handleLogout()}  // Call function to close profile with delay
              />
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
