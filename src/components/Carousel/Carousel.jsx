import  { useState, useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import '../../App.css';
import axios from 'axios';

function CarouselPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5005/api/games")
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.error("Error fetching games:", error);
      });
  }, []);

  return (
    <div>
      <Carousel>
        {games.map((game) => (
          <Carousel.Item key={game._id}>
            <img
              style={{ height: '80vh' }}
              className="d-block w-100"
              src={game.image}
              alt={game.name}
            />
            <Carousel.Caption>
              <h3>{game.name}</h3>
              <p>{game.year}</p> 
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselPage;
