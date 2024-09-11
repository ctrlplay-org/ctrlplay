import CarouselPage from "../../components/Carousel/Carousel";
import styles from "./Homepage.module.scss";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from "react";

export default function Homepage() {

  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/games/`)
      .then(response => setGames(response.data))
      .catch(error => console.error("Error fetching games:", error));
  }, []);

  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  return (
    <div>
      <div>
        <CarouselPage />
      </div>
      <div className={styles.releases}>
        <div>
          <h1>New releases</h1>
        </div>
        <div className={styles.gameReleased}>
          <div className={styles.gamesGrid}>
            {games.slice().reverse().slice(0, 6).map((game) => (
              <div
                key={game.id}
                className={styles.gameCard}
                onClick={() => handleGameClick(game._id)}
                style={{
                  backgroundImage: `url(${game.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >

                <div className={styles.overlay}>
                  <h1 className={styles.gameTitle}>{game?.name}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
