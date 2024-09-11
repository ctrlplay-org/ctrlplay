import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./EditGamePage.module.scss";
import { useParams, useNavigate } from 'react-router-dom';

export default function EditGamePage() {
  const { gameId } = useParams(); 
  const navigate = useNavigate(); 
  const [game, setGame] = useState({
    name: '',
    year: '',
    genre: '',
    image: '',
    platforms: '',
    publishers: []
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    
    axios.get(`${import.meta.env.VITE_API_URL}/api/games/${gameId}`, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
    .then(response => {
      setGame({
        name: response.data.name,
        year: response.data.year,
        genre: response.data.genre.join(', '),
        image: response.data.image,
        platforms: response.data.platforms.join(', '),
        publishers: response.data.publishers.map(pub => pub._id)
      });
    })
    .catch(error => console.error("Error fetching game data:", error));
  }, [gameId]);

  const handleEditGame = (event) => {
    event.preventDefault(); 
    if (!game.name.trim() || !game.year) return;

    const updatedGameData = {
      name: game.name,
      year: game.year,
      genre: game.genre.split(',').map((item) => item.trim()),  
      image: game.image,
      platforms: game.platforms.split(',').map((item) => item.trim()),  
      publishers: game.publishers
    };

    const storedToken = localStorage.getItem('authToken');

    axios.put(`${import.meta.env.VITE_API_URL}/api/games/${gameId}`, updatedGameData, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
    .then(response => {
      console.log("Game updated successfully:", response.data);
      navigate(`/games/${gameId}`); 
    })
    .catch(error => console.error("Error updating game:", error));
  };

  return (
    <div className={styles.EditGamePage}>
      <h1 className={styles.h1}>Edit Game</h1>
      <form className={styles.editGameForm} onSubmit={handleEditGame}>

        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={game.name}
            onChange={(e) => setGame({ ...game, name: e.target.value })}
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
            value={game.year}
            onChange={(e) => setGame({ ...game, year: e.target.value })}
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
            value={game.genre}
            onChange={(e) => setGame({ ...game, genre: e.target.value })}
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
            value={game.platforms}
            onChange={(e) => setGame({ ...game, platforms: e.target.value })}
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
            value={game.publishers}
            onChange={(e) => setGame({ ...game, publishers: e.target.value })}
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
            value={game.image}
            onChange={(e) => setGame({ ...game, image: e.target.value })}
            placeholder="Enter the game image URL"
            className={styles.inputField}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Save Changes
        </button>
      </form>
    </div>
  );
}