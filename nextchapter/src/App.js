import { useState } from 'react';
import { getRecommendationsA } from './auteur.mjs';
import { getRecommendationsG } from './genre.mjs';
import { getRecommendationsS } from './synopsis.mjs';
import Header from './Components/Header';
import Login from './Components/LoginForm';
import './App.css';

export default function MyApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [response, setResponse] = useState('');
  const [searchType, setSearchType] = useState(null);
  
  // État supplémentaire
  const [userGrade, setUserGrade] = useState('free'); // 'free', 'basic', 'premium'
  const [requestCount, setRequestCount] = useState(0);

  const handleLoginSuccess = (token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
    setUserGrade('free'); // Par défaut, grade "free" après connexion
    setRequestCount(0); // Réinitialise le compteur après connexion
    localStorage.setItem('authToken', token);
    setIsLoginFormVisible(false);
  };

  const handleLogout = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    setUserGrade(null);
    setRequestCount(0);
    localStorage.removeItem('authToken');
  };

  const handleQuerySubmit = async () => {
    if (!isAuthenticated) {
      setResponse('You must be logged in to make a request.');
      return;
    }

    if (userGrade === 'free' && requestCount >= 1) {
      setResponse('Free users are limited to 1 request.');
      return;
    }

    if (userGrade === 'basic' && requestCount >= 5) {
      setResponse('Basic users are limited to 5 requests.');
      return;
    }

    try {
      let recommendation;
      if (searchType === 'author') {
        recommendation = await getRecommendationsA(userQuery);
      } else if (searchType === 'genre') {
        recommendation = await getRecommendationsG(userQuery);
      } else if (searchType === 'synopsis') {
        recommendation = await getRecommendationsS(userQuery);
      } else {
        recommendation = 'Please select a search type.';
      }

      setResponse(recommendation);
      setRequestCount(requestCount + 1); // Incrémenter le compteur de requêtes
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setResponse('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Header
        isAuthenticated={isAuthenticated}
        onLoginClick={() => setIsLoginFormVisible(true)} 
        onLogoutClick={handleLogout}
        onLoginSuccess={handleLoginSuccess}
      />
      {isLoginFormVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Connexion</h2>
            <Login onLoginSuccess={handleLoginSuccess} />
            <button onClick={() => setIsLoginFormVisible(false)}>Fermer</button>
          </div>
        </div>
      )}
      <h1>Welcome to nextchapter</h1>
      <div>
        <label>
          Select Search Type:
          <select onChange={(e) => setSearchType(e.target.value)}>
            <option value="">--Select--</option>
            <option value="author">Author</option>
            <option value="genre">Genre</option>
            <option value="synopsis">Synopsis</option>
          </select>
        </label>
        <textarea
          placeholder="Type your query here..."
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
        />
        <button 
          className="submit-button" 
          onClick={handleQuerySubmit}
          disabled={!isAuthenticated || 
                    (userGrade === 'free' && requestCount >= 1) || 
                    (userGrade === 'basic' && requestCount >= 5)}
        >
          Submit
        </button>
      </div>
      <div>
        <h2>Response:</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
}
