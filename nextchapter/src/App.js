import { useState, useEffect } from 'react';
import { getRecommendationsA } from './auteur.mjs';
import { getRecommendationsG } from './genre.mjs';
import { getRecommendationsS } from './synopsis.mjs';
import Header from './Components/Header';
import Login from './Components/LoginForm';
import { getUserInfo } from './api'; // Assurez-vous que cette fonction est bien importée
import './App.css';

// Limites des requêtes par grade
const gradeLimits = {
  free: 1,
  basic: 5,
  premium: Infinity, // Pas de limite pour les utilisateurs premium
};

export default function MyApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [response, setResponse] = useState('');
  const [searchType, setSearchType] = useState(null);

  // État supplémentaire
  const [userGrade, setUserGrade] = useState(null); // Grade récupéré depuis la BDD
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    // Récupérer les informations utilisateur après authentification
    if (authToken) {
      getUserInfo(authToken)
        .then((data) => {
          setUserGrade(data.grade); // Mettre à jour le grade depuis la BDD
          setRequestCount(0); // Réinitialiser le compteur de requêtes
        })
        .catch((error) => {
          console.error('Error fetching user info:', error);
        });
    }
  }, [authToken]);

  const handleLoginSuccess = (token) => {
    setAuthToken(token);
    setIsAuthenticated(true);
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

    // Vérification des limites selon le grade
    const maxRequests = gradeLimits[userGrade] || 0;
    if (requestCount >= maxRequests) {
      setResponse(`You have reached your request limit for the ${userGrade} grade.`);
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

  const remainingRequests = userGrade ? (gradeLimits[userGrade] - requestCount) : 0;

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
          disabled={
            !isAuthenticated ||
            (userGrade && requestCount >= (gradeLimits[userGrade] || 0))
          }
        >
          Submit
        </button>
        {isAuthenticated && userGrade && (
          <><h3>Remaining Requests: {remainingRequests}</h3></> 
        )}
      </div>
      <div>
        <h2>Response:</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
}
