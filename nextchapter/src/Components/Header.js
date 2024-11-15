import React from 'react';
import './Header.css';

const Header = ({ isAuthenticated, onLoginClick, onLogoutClick }) => {
  return (
    <header className="header">
      <h1 className="title">NextChapter</h1>
      <button className="button" onClick={isAuthenticated ? onLogoutClick : onLoginClick}>
        {isAuthenticated ? 'Se déconnecter' : 'Se connecter'}
      </button>
    </header>
  );
};

export default Header;
