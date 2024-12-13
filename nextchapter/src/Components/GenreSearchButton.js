import React, { useState } from 'react';
import axios from 'axios';
import { getRecommendationsG } from '../genre.mjs'; 

const GenreSearchButton = () => {
  const [genre, setGenre] = useState(''); 
  const [books, setBooks] = useState([]); 
  const [recommendations, setRecommendations] = useState(''); 

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/books/searchByGenre', { genre: '' });
      setBooks(response.data);
  
      const bookDetails = response.data.map((book) => `${book.title} by ${book.authors?.join(', ')}`).join('. ');
  
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
