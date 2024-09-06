import React, { useState } from 'react';
import styles from './ProfilePage.module.scss';

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
  ]); // Sample wishlist items

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

  return (
    <div className={styles.profileContainer}>
      <div className={styles.bannerContainer}>
        <img src={banner} alt="Banner" className={styles.banner} />
        <img
          src={profilePicture}
          alt="Profile"
          className={styles.profilePhoto}
        />
      </div>

      <div className={styles.profileSection}>
        <h1 className={styles.username}>John Doe</h1>
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

      <div className={styles.dashboard}>
        <h2 className={styles.dashboardTitle}>Dashboard</h2>

        {/* Games Played Section */}
        <div className={styles.gamesSection}>
          <h3>Games Played</h3>
          <div className={styles.gamesGrid}>
            {games.map((game, index) => (
              <div key={index} className={styles.gameCard}>
                {game}
              </div>
            ))}
          </div>
        </div>

        {/* Wishlist Section */}
        <div className={styles.wishlistSection}>
          <h3>Wishlist</h3>
          <div className={styles.wishlistGrid}>
            {wishlist.map((item, index) => (
              <div key={index} className={styles.wishlistCard}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
