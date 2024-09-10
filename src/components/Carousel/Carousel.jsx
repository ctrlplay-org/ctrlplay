import { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CarouselPage() {
  const [featuredGames, setFeaturedGames] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/games/featured`)
      .then(response => setFeaturedGames(response.data))
      .catch(error => console.error("Error fetching featured games:", error));
  }, []);

  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  return (
    <div>
      <Carousel>
        {featuredGames.map((game) => (
          <Carousel.Item key={game._id}>
            <img
              style={{ height: '80vh', cursor: 'pointer' }} 
              className="d-block w-100"
              src={game.image}
              alt={game.name}
              onClick={() => handleGameClick(game._id)} 
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselPage;
