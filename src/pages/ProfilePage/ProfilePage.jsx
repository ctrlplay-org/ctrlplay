import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from "../../context/auth.context";
import styles from './ProfilePage.module.scss';

export default function ProfilePage() {
  const { userId } = useParams();
  const [profileUser, setProfileUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [banner, setBanner] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [games, setGames] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const { user, isLoading: authLoading } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

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
    return <p>Loading...</p>;
  }

  if (!profileUser) {
    return <p>User not found</p>;
  }

  const handleSubmit = async () => {
    const storedToken = localStorage.getItem("authToken");

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        });
        setProfileUser(response.data);

        setIsEditing(false);
        setBanner('');  
        setImageUrl('');  
    } catch (error) {
        console.error('Error updating profile:', error);
    }
};
const handleBannerChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/upload`;
      const storedToken = localStorage.getItem("authToken");
      const dataToUpload = new FormData();
      dataToUpload.append("file", file);
      dataToUpload.append("upload_preset", import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET);

      const response = await axios.post(url, dataToUpload);
      const uploadedImageUrl = response.data.secure_url;

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/banner`,
        { bannerUrl: uploadedImageUrl },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      setImageUrl(uploadedImageUrl);

      console.log("Profile banner updated:", uploadedImageUrl);
    } catch (error) {
      console.error("Error updating profile banner:", error);
    }
  }
};

const handleProfilePictureChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/upload`;
      const storedToken = localStorage.getItem("authToken");
      const dataToUpload = new FormData();
      dataToUpload.append("file", file);
      dataToUpload.append("upload_preset", import.meta.env.VITE_UNSIGNED_UPLOAD_PRESET);
      const response = await axios.post(url, dataToUpload);
      const uploadedImageUrl = response.data.secure_url;

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/profile-picture`,
        { profileImgUrl: uploadedImageUrl },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      setProfilePicture(uploadedImageUrl);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
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

  return (
    <div className={styles.profileContainer}>
      <div className={styles.bannerContainer}>
        <img 
          src={profileUser.bannerImg || '/path/to/default/banner.jpg'} 
          alt="Banner" 
          className={styles.banner} 
        />
        <img
          src={profileUser.profileImg || '/path/to/profile/photo.jpg'}
          alt="Profile"
          className={styles.profilePhoto}
        />
      </div>

      <div className={styles.profileSection}>
        <div   className={styles.overlay}><h1 className={styles.username}>{profileUser.name}</h1></div>
        {user && user._id === profileUser._id && (
          <button
            className={styles.editProfileButton}
            onClick={() => {
              if (isEditing) {
                handleSubmit();
              } else {
                setIsEditing(!isEditing);
              }
            }}
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
              onChange={e => handleBannerChange(e)}
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
              onChange={e => handleProfilePictureChange(e)}
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
                key={game._id}
                className={styles.gameCard}
                onClick={() => handleGameClick(game._id)}
                style={{
                  backgroundImage: `url(${game.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              > <div className={styles.overlay}>
                  <h1 className={styles.gameTitle}>{game?.name}</h1>
                </div>
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
              key={game._id}
              className={styles.gameCard}
              onClick={() => handleGameClick(game._id)}
              style={{
                backgroundImage: `url(${game.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >

              {profileUser._id === user._id && (
                <button onClick={() => handlePlayedDelete(game._id)} className={styles.deleteButton}>X</button>
              )}
                <div className={styles.overlay}>
                  <h1 className={styles.gameTitle}>{game?.name}</h1>
                </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dashboard}>
        <h2 className={styles.dashboardTitle}>Wishlist</h2>
        <div className={styles.wishlistGrid}>
          {profileUser.wishlist.map(game => (
            <div
              key={game._id}
              className={styles.gameCard}
              onClick={() => handleGameClick(game._id)}
              style={{
                backgroundImage: `url(${game.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >

            {profileUser._id === user._id && (
                <button onClick={() => handleWishlistDelete(game._id)} className={styles.deleteButton}>X</button>
              )}
               <div className={styles.overlay}>
                  <h1 className={styles.gameTitle}>{game?.name}</h1>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
