import styles from "./Navbar.module.scss"
import { Link } from "react-router-dom";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../../context/auth.context";

export default function Navbar() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext); 
    return (
        <div className={styles.navbar} >
            <nav className={styles.nav} >
            <Link to="/"> 
            <video
            className={`img1 ${styles.video}`}
            src="ctrlplay-logo-animated.mp4"
            alt="logo"
            autoPlay
            muted
            loop
          /></Link>
                <form className={styles.searchForm}>
                    <input
                        type="text"
                        placeholder="Search for a game or a user"
                        className={styles.searchInput}
                    />
                    <button type="submit" className={styles.searchButton}>
                        <i className={`fa-solid fa-magnifying-glass ${styles.fa}`}></i>
                    </button>
                </form>
                <div className={styles.links}>
                        {isLoggedIn && (
                    <>
                    <Link to="/addgame"> Add Game</Link>
                    <Link to="/profile"> Profile</Link>
                    <button onClick={logOutUser}>Logout</button>
                    <span>{user && user.name}</span>
                    </>
                )}
                    <Link to ="/about"> About </Link>
                    {!isLoggedIn && (
                    <Link to="/login"> Sign In </Link>
                )}
                </div>
            </nav>
        </div>
    )
}