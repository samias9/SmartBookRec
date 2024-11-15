import { useState } from 'react';
import { getRecommendationsA } from './auteur.mjs';
import { getRecommendationsG } from './genre.mjs';
import { getRecommendationsS } from './synopsis.mjs';
import logo from './logo.png';
import './App.css';

export default function MyApp() {
  // État pour stocker la méthode de recherche et les résultats
  const [searchType, setSearchType] = useState(null);
  const [result, setResult] = useState(null);

  // Gestion des recherches en fonction du type
  const handleSearch = async (type) => {
    let response;
    try{
    if (type === 'author') {
      response = await getRecommendationsA('Victor Hugo et Guillaume Musso');
    } else if (type === 'genre') {
      response = await getRecommendationsG('Roman policier');
    } else if (type === 'synopsis') {
      response = await getRecommendationsS("Un aventurier qui part à la conquête de l'espace");
    }
    
    setSearchType(type);
    setResult(response); // Stocker le résultat de la recherche
  }
  catch (error) {
    console.error("Error during API call:", error);
  }
};

  return (
    <div>
      <h1>Welcome to nextchapter</h1>
      <button onClick={() => handleSearch('author')}>Search by authors</button>
      <button onClick={() => handleSearch('synopsis')}>Search by synopsis</button>
      <button onClick={() => handleSearch('genre')}>Search by genres</button>
      <img src={logo} alt="logo" />

      {/* Afficher les résultats */}
      <div>
        {searchType && <h2>Results for {searchType} search:</h2>}
        <pre>{result}</pre>
      </div>
    </div>
  );
}
