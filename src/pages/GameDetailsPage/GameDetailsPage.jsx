import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './GameDetailsPage.module.scss';

function GameDetailsPage() {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [reviews, setReviews] = useState([]); 
  const [newReview, setNewReview] = useState({
    title: '',
    description: '',
    rating: '',
  }); 

  useEffect(() => {
    axios.get(`http://localhost:5005/api/games/${gameId}`)
      .then(response => setGameDetails(response.data))
      .catch(error => console.error("Error fetching game details:", error));

    
    axios.get(`http://localhost:5005/api/games/${gameId}/reviews`)
      .then(response => setReviews(response.data))
      .catch(error => console.error("Error fetching reviews:", error));
  }, [gameId]);

  const handleAddReview = () => {
    if (newReview.title.trim() === '' || newReview.rating === '') return;

    const reviewData = {
      ...newReview,
      game: gameId, 
      date: new Date().toISOString(), 
      author: "USER_ID", 
    };

    
    axios.post(`http://localhost:5005/api/games/${gameId}/reviews`, reviewData)
      .then(response => {
        setReviews([...reviews, response.data]);
        setNewReview({ title: '', description: '', rating: '' }); 
      })
      .catch(error => console.error("Error adding review:", error));
  };

  return (
    <div className={styles.gameDetailsContainer}>
      <div className={styles.bannerContainer}>
        <img
          src={gameDetails?.image}
          alt={gameDetails?.name}
          className={styles.banner}
        />
        <div className={styles.overlay}>
          <h1 className={styles.gameTitle}>{gameDetails?.name}</h1>
        </div>
      </div>

     
      <div className={styles.contentSection}>
       
        <div className={styles.leftColumn}>
          <div className={styles.detailsSection}>
            <p className={styles.genre}>Genre: {gameDetails?.genre}</p>
            <p className={styles.platforms}>Available on: {gameDetails?.platforms}</p>
            <p className={styles.platforms}>By {gameDetails?.publishers[0].name}</p>
            <p className={styles.platforms}>Year: {gameDetails?.year}</p>
          </div>
        </div>

        
        <div className={styles.rightColumn}>
          <h2 className={styles.reviewsTitle}>Reviews</h2>

          
          <div className={styles.reviewsContainer}>
            {reviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                <h3>{review.title}</h3>
                <p>{review.description}</p>
                <p>Rating: {review.rating}</p>
                <small>{new Date(review.date).toLocaleDateString()}</small>
              </div>
            ))}
          </div>

          
          <div className={styles.addReviewSection}>
            <input
              type="text"
              placeholder="Title"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              className={styles.inputField}
            />
            <textarea
              value={newReview.description}
              onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
              placeholder="Description"
              className={styles.reviewInput}
            />
            <input
              type="number"
              placeholder="Rating (1-5)"
              value={newReview.rating}
              onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
              className={styles.inputField}
            />
            <button onClick={handleAddReview} className={styles.addReviewButton}>
              Add Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetailsPage;

