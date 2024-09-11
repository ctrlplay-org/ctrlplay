import styles from "./Navbar.module.scss"
import { Link } from "react-router-dom";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../../context/auth.context";
import SearchBar from "../SearchBar/SearchBar";

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
                <SearchBar />
                <div className={styles.links}>
                        {isLoggedIn && (
                    <>
                    <Link to="/addgame"> Add Game</Link>
                    <Link to={`/users/${user._id}`}> Profile</Link>
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