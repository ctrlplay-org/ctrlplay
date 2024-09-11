import { useState } from 'react';
import axios from 'axios';
import { useContext } from "react";                    
import { AuthContext } from "../../context/auth.context";
import styles from "./AddGamePage.module.scss";


export default function AddGamePage() {
  const { isLoggedIn, user } = useContext(AuthContext);  
  const [newGame, setNewGame] = useState({
    name: '',
    year: '',
    genre: '',
    image: '',
    platforms: '',
    publishers: ''
  });

  const handleAddGame = (event) => {
    event.preventDefault(); 
    if (!newGame.name.trim() || !newGame.year.trim()) return;

    const gameData = {
      name: newGame.name,
      year: newGame.year,
      genre: newGame.genre.split(',').map((item) => item.trim()),  
      image: newGame.image,
      platforms: newGame.platforms.split(',').map((item) => item.trim()),  
      publishers: newGame.publishers.split(',').map((item) => item.trim()) 
    };

    const storedToken = localStorage.getItem('authToken');  

    axios.post(`${import.meta.env.VITE_API_URL}/api/games`, gameData, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
    .then(response => {
      console.log("Game created successfully:", response.data);
      setNewGame({ name: '', year: '', genre: '', image: '', platforms: '', publishers: '' });
    })
    .catch(error => console.error("Error adding game:", error));
  };

  return (
    <div className={styles.AddGamePage}>
      <h1 className={styles.h1}>Add a Game</h1>
      {isLoggedIn ? (
      <form className={styles.addGameForm} onSubmit={handleAddGame}>

        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={newGame.name}
            onChange={(e) => setNewGame({ ...newGame, name: e.target.value })}
            placeholder="Enter the game name"
            className={styles.inputField}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            required
            value={newGame.year}
            onChange={(e) => setNewGame({ ...newGame, year: e.target.value })}
            placeholder="Enter the year it was created"
            className={styles.inputField}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            required
            value={newGame.genre}
            onChange={(e) => setNewGame({ ...newGame, genre: e.target.value })}
            placeholder="Enter the game genre(s), separated by commas"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="platforms">Platforms:</label>
          <input
            type="text"
            id="platforms"
            name="platforms"
            required
            value={newGame.platforms}
            onChange={(e) => setNewGame({ ...newGame, platforms: e.target.value })}
            placeholder="Enter the platforms, separated by commas"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="publishers">Publishers:</label>
          <input
            type="text"
            id="publishers"
            name="publishers"
            value={newGame.publishers}
            onChange={(e) => setNewGame({ ...newGame, publishers: e.target.value })}
            placeholder="Enter publisher(s), separated by commas"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Image URL:</label>
          <input
            type="url"
            id="image"
            name="image"
            required
            value={newGame.image}
            onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
            placeholder="Enter the game image URL"
            className={styles.inputField}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Create Game
        </button>
      </form>
      ) : (
        <p>Please log in to add a new game.</p>
      )}
    </div>
  );
}