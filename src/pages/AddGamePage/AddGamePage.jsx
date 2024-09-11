import { useState } from 'react';
import axios from 'axios';
import { useContext } from "react";                    
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from 'react-router-dom';
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

  const [errors, setErrors] = useState({});  
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!newGame.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!newGame.year.trim()) {
      newErrors.year = "Year is required";
    } else if (!/^\d{4}$/.test(newGame.year)) {
      newErrors.year = "Year must be a valid 4-digit number";
    }

    if (!newGame.genre.trim()) {
      newErrors.genre = "At least one genre is required";
    }

    if (!newGame.platforms.trim()) {
      newErrors.platforms = "At least one platform is required";
    }

    if (!newGame.publishers.trim()) {
      newErrors.publishers = "At least one publisher is required";
    }

    if (!newGame.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!/^https?:\/\/.*\.(jpeg|jpg|gif|png)$/.test(newGame.image)) {
      newErrors.image = "Image URL must be a valid URL and end with .jpeg, .jpg, .gif, or .png";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleAddGame = (event) => {
    event.preventDefault(); 

    if (!validate()) {
      return; 
    }

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
      const gameId = response.data._id;
      setNewGame({ name: '', year: '', genre: '', image: '', platforms: '', publishers: '' });
      setErrors({});
      navigate(`/games/${gameId}`);
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
          {errors.name && <span className={styles.error}>{errors.name}</span>}
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
          {errors.year && <span className={styles.error}>{errors.year}</span>}
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
          {errors.genre && <span className={styles.error}>{errors.genre}</span>}
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
          {errors.platforms && <span className={styles.error}>{errors.platforms}</span>}
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
          {errors.publishers && <span className={styles.error}>{errors.publishers}</span>}
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
          {errors.image && <span className={styles.error}>{errors.image}</span>}
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