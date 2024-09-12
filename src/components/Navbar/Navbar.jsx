import styles from "./Navbar.module.scss";
import { Link } from "react-router-dom";
import { useContext, useState } from "react"; 
import { AuthContext } from "../../context/auth.context";
import SearchBar from "../SearchBar/SearchBar";

export default function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); 
  };

  return (
    <div className={styles.navbar}>
      <nav className={styles.nav}>
        <Link to="/">
          <video
            className={`img1 ${styles.video}`}
            src="ctrlplay-logo-animated.mp4"
            alt="logo"
            autoPlay
            muted
            loop
          />
        </Link>
        <SearchBar />
        <div className={styles.links}>
        <Link to="/about">About</Link>
          {isLoggedIn && (
            <>
              <div className={styles.profileDropdown}>
                <img
                  src={user.profileImg || '/path/to/default/profile.jpg'} 
                  alt="Profile"
                  className={styles.profilePicture}
                  onClick={toggleDropdown} 
                />
                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {user.isPublisher && (
                        <>
                        <Link to="/addgame">Add Game</Link>
                        </>
                    )}
                    <Link to={`/users/${user._id}`}>Profile</Link>
                   <Link to="/" onClick={logOutUser}>Log out</Link>
                  </div>
                )}
              </div>
            </>
          )}

          <div>
          {!isLoggedIn && (
            <Link to="/login">Sign In</Link>
          )}
          </div>
        </div>
      </nav>
    </div>
  );
}
