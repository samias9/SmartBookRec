
import React, { useState } from 'react';
import axios from 'axios';
import { getRecommendationsS } from '../synopsis.mjs'; 

const SynopsisSearchButton = () => {
  const [synopsis, setSynopsis] = useState(''); 
  const [books, setBooks] = useState([]); 
  const [recommendations, setRecommendations] = useState(''); 

  const handleSearch = async () => {
    if (!synopsis.trim()) {
      alert("Veuillez entrer un synopsis valide.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/api/books/searchBySynopsis', { synopsis });
      setBooks(response.data);

      const gptResponse = await getRecommendationsS(synopsis);
      setRecommendations(gptResponse);
    } catch (error) {
      console.error('Erreur pendant la recherche des livres :', error.response?.data || error.message);
      alert(error.response?.data?.message || "Erreur inconnue.");
    }
  };

  return (
    <div>
      <textarea
        placeholder="Entrez un synopsis"
        value={synopsis}
        onChange={(e) => setSynopsis(e.target.value)}
        rows="4"
        cols="50"
      />
      <button onClick={handleSearch}>Rechercher</button>

      <div>
        <h3>Livres avec le même synopsis :</h3>
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <h4>{book.title}</h4>
              <p>{book.authors?.join(', ')}</p>
              <img src={book.thumbnail} alt={book.title} />
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Recommandations :</h3>
        <p>{recommendations}</p>
      </div>
    </div>
  );
};

export default SynopsisSearchButton;
