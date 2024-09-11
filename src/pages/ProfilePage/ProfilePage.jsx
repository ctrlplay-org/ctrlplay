import { useState } from 'react';
import styles from './ProfilePage.module.scss';
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

export default function ProfilePage() {
  const [banner, setBanner] = useState('/path/to/default/banner.jpg');
  const [profilePicture, setProfilePicture] = useState('/path/to/profile/photo.jpg');
  const [isEditing, setIsEditing] = useState(false);
  const [games, setGames] = useState([
    'Cyberpunk 2077',
    'The Witcher 3',
    'Hades',
    'Red Dead Redemption 2',
  ]);
  const [wishlist, setWishlist] = useState([
    'Elden Ring',
    'Hollow Knight: Silksong',
    'Final Fantasy XVI',
  ]);

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

  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <p>Loading...</p>; // Or any loading indicator
  }

  if (!user) {
    return <p>User not found</p>; // Or any appropriate message
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.bannerContainer}>
        <img src={user.bannerImg || '/path/to/default/banner.jpg'} alt="Banner" className={styles.banner} />
        <img
          src={user.profileImg || '/path/to/profile/photo.jpg'}
          alt="Profile"
          className={styles.profilePhoto}
        />
      </div>

      <div className={styles.profileSection}>
        <h1 className={styles.username}>{user.name}</h1>
        <button
          className={styles.editProfileButton}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </button>
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

      {/* Games Played Dashboard */}
      <div className={styles.dashboard}>
        <h2 className={styles.dashboardTitle}>Games Played</h2>
        <div className={styles.gamesGrid}>
          {games.map((game, index) => (
            <div key={index} className={styles.gameCard}>
              {game}
            </div>
          ))}
        </div>
      </div>

      {/* Wishlist Dashboard */}
      <div className={styles.dashboard}>
        <h2 className={styles.dashboardTitle}>Wishlist</h2>
        <div className={styles.wishlistGrid}>
          {wishlist.map((item, index) => (
            <div key={index} className={styles.wishlistCard}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
