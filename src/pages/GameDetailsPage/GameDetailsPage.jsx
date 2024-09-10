import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import styles from './GameDetailsPage.module.scss';
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../../context/auth.context";

function GameDetailsPage() {
  const { gameId } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    title: '',
    description: '',
    rating: 0,
  });
  const { isLoggedIn } = useContext(AuthContext); 
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/games/${gameId}`)
      .then(response => setGameDetails(response.data))
      .catch(error => console.error("Error fetching game details:", error));

    // Fetch reviews
    axios.get(`${import.meta.env.VITE_API_URL}/api/games/${gameId}/reviews`)
      .then(response => setReviews(response.data))
      .catch(error => console.error("Error fetching reviews:", error));
  }, [gameId]);

  const handleAddReview = () => {
    if (newReview.title.trim() === '' || newReview.rating === 0) return;

    const reviewData = {
      ...newReview,
      game: gameId,
      date: new Date().toISOString(),
      author: "USER_ID",
    };
    const storedToken = localStorage.getItem('authToken');

    axios.post(`${import.meta.env.VITE_API_URL}/api/games/${gameId}/reviews`, reviewData, { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(response => {
        setReviews([...reviews, response.data]);
        setNewReview({ title: '', description: '', rating: 0 });
      })
      .catch(error => console.error("Error adding review:", error));
  };

  return (
    <div className={styles.gameDetailsContainer}>
      {/* Full-Width Banner */}
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

      {/* Content Section */}
      <div className={styles.contentSection}>
        {/* Left Column for Game Details */}
        <div className={styles.leftColumn}>
          <div className={styles.detailsSection}>
            <p className={styles.genre}><span>Genre:</span> {gameDetails?.genre}</p>
            <p className={styles.genre}><span>By:</span> {gameDetails?.publishers[0].name}</p>
            <p className={styles.genre}><span>Year:</span> {gameDetails?.year}</p>
            <p className={styles.platforms}><span>Platforms: </span>
              {gameDetails?.platforms.join(', ')}
            </p>
          </div>
        </div>

        {/* Right Column for Reviews */}
        <div className={styles.rightColumn}>
          <h2 className={styles.reviewsTitle}>Reviews</h2>

          {/* Reviews Section */}
    
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
    
          {/* Add Review Section */}
          {isLoggedIn && (
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
            <ReactStars
              count={5}
              onChange={(newRating) => setNewReview({ ...newReview, rating: newRating })}
              size={24}
              activeColor="#c7ff0b"
              value={newReview.rating} // set the current rating
            />
            <button onClick={handleAddReview} className={styles.addReviewButton}>
              Add Review
            </button>
          </div>
           )}
        </div>
      </div>
    </div>
  );
}

export default GameDetailsPage;
