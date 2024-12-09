//GenreSearchButton.js
import React, { useState } from 'react';
import axios from 'axios';
import { getRecommendationsG } from '../genre.mjs'; // Assurez-vous que le chemin est correct

const GenreSearchButton = () => {
  const [genre, setGenre] = useState(''); // Champ pour le genre
  const [books, setBooks] = useState([]); // Stocker les résultats de la recherche
  const [recommendations, setRecommendations] = useState(''); // Stocker les recommandations de GPT

  // Fonction pour gérer la recherche
  const handleSearch = async () => {
    try {
      // Step 1: Fetch all books from the database
      const response = await axios.post('http://localhost:5002/api/books/searchByGenre', { genre: '' });
      setBooks(response.data);
  
      // Extract details (e.g., titles, authors) for OpenAI recommendations
      const bookDetails = response.data.map((book) => `${book.title} by ${book.authors?.join(', ')}`).join('. ');
  
      // Step 2: Obtain recommendations via OpenAI
      const gptResponse = await getRecommendationsG(bookDetails);
      setRecommendations(gptResponse);
    } catch (error) {
      console.error('Error fetching books:', error.response?.data || error.message);
      alert(error.response?.data?.message || "Unknown error occurred.");
    }
  };  

  return (
    <div>
      <input
        type="text"
        placeholder="Entrez un genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>

      <div>
        <h3>Livres du genre :</h3>
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

export default GenreSearchButton;
