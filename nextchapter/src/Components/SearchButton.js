import React, { useState } from 'react';
import axios from 'axios';
import { getRecommendationsA } from '../auteur.mjs'; 

const SearchButton = () => {
  const [author, setAuthor] = useState(''); 
  const [books, setBooks] = useState([]); 
  const [recommendations, setRecommendations] = useState(''); 

  const handleSearch = async () => {
    if (!author.trim()) {
      alert("Veuillez entrer un auteur valide.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/books/search', { author });
      setBooks(response.data);

      const authorNames = [...new Set(response.data.flatMap((book) => book.authors || []))];

      const gptResponse = await getRecommendationsA(authorNames.join(', '));
      setRecommendations(gptResponse);
    } catch (error) {
      console.error('Erreur pendant la recherche des livres :', error.response?.data || error.message);
      alert(error.response?.data?.message || "Erreur inconnue.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Entrez un auteur"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>

      <div>
        <h3>Livres de l'auteur :</h3>
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

export default SearchButton;
