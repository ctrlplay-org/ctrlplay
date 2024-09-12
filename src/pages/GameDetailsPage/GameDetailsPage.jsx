import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';
import styles from './GameDetailsPage.module.scss';
import { AuthContext } from "../../context/auth.context";

function GameDetailsPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    title: '',
    description: '',
    rating: 0,
  });
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editReview, setEditReview] = useState({
    title: '',
    description: '',
    rating: 0,
  });
  const [userPlayed, setUserPlayed] = useState(null)
  const [userWishlist, setUserWishlist] = useState(null)
  const { isLoggedIn, user } = useContext(AuthContext);

  const storedToken = localStorage.getItem('authToken');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/games/${gameId}`)
      .then(response => setGameDetails(response.data))
      .catch(error => console.error("Error fetching game details:", error));

    axios.get(`${import.meta.env.VITE_API_URL}/api/reviews/game/${gameId}`)
      .then(response => setReviews(response.data))
      .catch(error => console.error("Error fetching reviews:", error));


    if (user && user._id) {

      axios.get(`${import.meta.env.VITE_API_URL}/api/users/${user._id}`)
        .then(response => {
          const playedGames = response.data.played;
          const wishlistGames = response.data.wishlist;

          const isGameInPlayed = playedGames.includes(gameId);
          const isGameInWishlist = wishlistGames.includes(gameId);

          setUserPlayed(isGameInPlayed);
          setUserWishlist(isGameInWishlist);
        })
        .catch(error => console.error("Error fetching user played and wishlist games:", error));
    }

  }, [user, gameId]);

  const handleAddReview = () => {
    if (!newReview.title.trim() || !newReview.rating) return;

    const reviewData = {
      ...newReview,
      game: gameId,
      date: new Date().toISOString(),
      author: user,
    };

    const storedToken = localStorage.getItem('authToken');

    axios.post(`${import.meta.env.VITE_API_URL}/api/reviews`, reviewData, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
      .then(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/reviews/game/${gameId}`)
          .then(response => setReviews(response.data))
          .catch(error => console.error("Error fetching reviews:", error));

        setNewReview({ title: '', description: '', rating: 0 });
      })
      .catch(error => {
        console.error("Error while adding the review:", error.response ? error.response.data : error.message);
      });
  };

  const handleEditReview = () => {
    if (!editReview.title.trim() || !editReview.rating) return;

    const storedToken = localStorage.getItem('authToken');

    axios.put(`${import.meta.env.VITE_API_URL}/api/reviews/${editingReviewId}`, editReview, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(response => {
        // Update the reviews state immediately after editing
        setReviews(reviews.map(review =>
          review._id === editingReviewId ? { ...review, ...editReview } : review
        ));

        // Clear editing state
        setEditingReviewId(null);
        setEditReview({ title: '', description: '', rating: 0 });
      })
      .catch(error => console.error("Error while updating the review:", error));
  };


  const handleDeleteReview = (reviewId) => {
    const storedToken = localStorage.getItem('authToken');

    axios.delete(`${import.meta.env.VITE_API_URL}/api/reviews/${reviewId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
      .then(() => {
        setReviews(reviews.filter(review => review._id !== reviewId));
      })
      .catch(error => console.error("Error while deleting the review:", error));
  };

  const handleEditGame = () => {
    navigate(`/games/${gameId}/edit`);
  };

  const handleDeleteGame = () => {
    const storedToken = localStorage.getItem('authToken');

    axios.delete(`${import.meta.env.VITE_API_URL}/api/games/${gameId}`, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
      .then(() => {
        console.log("Game deleted successfully");
        navigate('/');
      })
      .catch(error => console.error("Error deleting game:", error));
  };

  const handleAddPlayed = () => {
    if (!isLoggedIn || !user) return;

    const storedToken = localStorage.getItem('authToken');

    axios.put(
      `${import.meta.env.VITE_API_URL}/api/users/${user._id}/played`,
      { gameId },
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then(response => {
        console.log("Game added to played list successfully:", response.data);
        setUserPlayed(true)
      })
      .catch(error => console.log(error));
  };

  const handleAddWishlist = () => {
    if (!isLoggedIn || !user) return;

    const storedToken = localStorage.getItem('authToken');

    axios.put(
      `${import.meta.env.VITE_API_URL}/api/users/${user._id}/wishlist`,
      { gameId },
      { headers: { Authorization: `Bearer ${storedToken}` } }
    )
      .then(response => {
        console.log("Game added to wishlist successfully:", response.data);
        setUserWishlist(true)
      })
      .catch(error => console.log(error));
  };

  console.log(user)

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
        {isLoggedIn && user && gameDetails?.publishers[0]._id === user._id && (
          <>
            <button onClick={handleEditGame} className={styles.editGameButton}>
              Edit
            </button>
            <button onClick={handleDeleteGame} className={styles.deleteGameButton}>
              Delete
            </button>
          </>
        )}
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
          <div className={styles.editColumn}>

            {isLoggedIn && !userPlayed && !userWishlist && (
              <>
                <button onClick={handleAddPlayed} className={styles.playedButton}>
                  Played
                </button>
                <button onClick={handleAddWishlist} className={styles.wishlistButton}>
                  Wishlist
                </button>
              </>
            )}

            {isLoggedIn && userWishlist && !userPlayed && (
              <>
                <button onClick={handleAddPlayed} className={styles.playedButton}>
                  Played
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Column for Reviews */}
        <div className={styles.rightColumn}>
          <h2 className={styles.reviewsTitle}>Reviews</h2>

          {/* Reviews Section */}
          <div className={styles.reviewsContainer}>
            {reviews.map((review, index) => (
              <div key={index} className={styles.reviewCard}>
                {editingReviewId === review._id ? (
                  <div className={styles.editReviewSection}>
                    <input
                      type="text"
                      value={editReview.title}
                      onChange={(e) => setEditReview({ ...editReview, title: e.target.value })}
                      className={styles.inputField}
                      placeholder="Title"
                    />
                    <textarea
                      value={editReview.description}
                      onChange={(e) => setEditReview({ ...editReview, description: e.target.value })}
                      className={styles.reviewInput}
                      placeholder="Description"
                    />
                    <ReactStars
                      count={5}
                      onChange={(newRating) => setEditReview({ ...editReview, rating: newRating })}
                      size={24}
                      activeColor="#9cf831"
                      value={editReview.rating}
                    />
                    <button onClick={handleEditReview} className={styles.addReviewButton}>
                      Update Review
                    </button>
                  </div>
                ) : (
                  <div className={styles.reviewContent}>
                    <h3 className={styles.reviewTitle}>{review.title}</h3>
                    <div className={styles.reviewStars}>
                      <ReactStars
                        count={5}
                        value={review.rating}
                        size={24}
                        edit={false}
                        activeColor="#9cf831"
                      />
                    </div>
                    <p>{review.description}</p>
                    <div className={styles.reviewFooter}>
                      <p className={styles.reviewAuthor}>By: {review.author.name}</p>
                      <small className={styles.reviewDate}>
                        {new Date(review.date).toLocaleDateString()}
                      </small>
                    </div>
                    {isLoggedIn && user && user._id === review.author._id && (
                      <>
                        <button onClick={() => handleDeleteReview(review._id)} className={styles.deleteButton}>
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setEditingReviewId(review._id);
                            setEditReview({
                              title: review.title,
                              description: review.description,
                              rating: review.rating,
                            });
                          }}
                          className={styles.editButton}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                )}
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
                value={newReview.rating}
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
