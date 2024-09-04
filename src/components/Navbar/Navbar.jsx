import styles from "./Navbar.module.scss"
import { Link } from "react-router-dom";

export default function Navbar() {


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
                    <Link to="/signup"> Sign up </Link>
                    <Link to="/login"> Log In </Link>
                </div>
            </nav>
        </div>
    )
}