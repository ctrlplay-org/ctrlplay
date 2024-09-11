import { useState, useEffect } from 'react';
import styles from './ProfilePage.module.scss';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProfilePage() {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [banner, setBanner] = useState('/path/to/default/banner.jpg');
  const [profilePicture, setProfilePicture] = useState('/path/to/profile/photo.jpg');
  const [games, setGames] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { user, isLoading: authLoading } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${storedToken}` }
        });
        setProfileUser(response.data);
        setGames(response.data.games || []);
        setWishlist(response.data.wishlist || []);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProfile();
  }, [userId]);

  if (authLoading || isLoading) {
    return <p>Loading...</p>; // Or any loading indicator
  }

  if (!profileUser) {
    return <p>User not found</p>; // Or any appropriate message
  }

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setBanner(fileURL);
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setProfilePicture(fileURL);
    }
  };

  const handlePlayedDelete = async (gameId) => {
    try {
      const storedToken = localStorage.getItem("authToken");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}/played/${gameId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setGames(prevGames => prevGames.filter(game => game._id !== gameId));
    } catch (error) {
      console.error('Error deleting game from played:', error);
    }
  };

  const handleWishlistDelete = async (gameId) => {
    try {
      const storedToken = localStorage.getItem("authToken");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${userId}/wishlist/${gameId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      setWishlist(prevWishlist => prevWishlist.filter(game => game._id !== gameId));
    } catch (error) {
      console.error('Error deleting game from wishlist:', error);
    }
  };

  const handleGameClick = (gameId) => {
    navigate(`/games/${gameId}`);
  };

  console.log(user)
  return (
    <div className={styles.profileContainer}>
      <div className={styles.bannerContainer}>
        <img src={profileUser.bannerImg || '/path/to/default/banner.jpg'} alt="Banner" className={styles.banner} />
        <img
          src={profileUser.profileImg || '/path/to/profile/photo.jpg'}
          alt="Profile"
          className={styles.profilePhoto}
        />
      </div>

      <div className={styles.profileSection}>
        <h1 className={styles.username}>{profileUser.name}</h1>
        {user && user._id === profileUser._id && (
          <button
            className={styles.editProfileButton}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        )}
      </div>

      {isEditing && (
        <div className={styles.editSection}>
          <h2>Edit Profile</h2>
          <div className={styles.uploadSection}>
            <label htmlFor="bannerUpload" className={styles.uploadLabel}>
              Change Banner
            </label>
            <input
              type="file"
              id="bannerUpload"
              onChange={handleBannerChange}
              className={styles.uploadInput}
            />
          </div>
          <div className={styles.uploadSection}>
            <label htmlFor="profilePictureUpload" className={styles.uploadLabel}>
              Change Profile Picture
            </label>
            <input
              type="file"
              id="profilePictureUpload"
              onChange={handleProfilePictureChange}
              className={styles.uploadInput}
            />
          </div>
        </div>
      )}

      {profileUser.isPublisher && (
        <div className={styles.dashboard}>
        <h2 className={styles.dashboardTitle}>Games Created</h2>
        <div className={styles.gamesGrid}>
          {profileUser.games.map(game => (
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
            {game.name}
          </div>
          ))}
        </div>
      </div>
      )}

      <div className={styles.dashboard}>
        <h2 className={styles.dashboardTitle}>Games Played</h2>
        <div className={styles.gamesGrid}>
          {profileUser.played.map(game => (
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
            {game.name}
            <button onClick={() => handlePlayedDelete(game._id)} className={styles.delButton}>X</button>
          </div>
          ))}
        </div>
      </div>

      <div className={styles.dashboard}>
        <h2 className={styles.dashboardTitle}>Wishlist</h2>
        <div className={styles.wishlistGrid}>
        {profileUser.wishlist.map(game => (
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
            {game.name}
            <button onClick={() => handleWishlistDelete(game._id)} className={styles.delButton}>X</button>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
