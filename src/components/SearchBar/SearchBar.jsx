import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour rediriger
import axios from "axios"; // Pour effectuer la requête de recherche
import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  const [query, setQuery] = useState(""); // Stocke la requête de recherche
  const navigate = useNavigate(); // Hook pour redirection

  const handleSearch = async (event) => {
    event.preventDefault();
  
    if (!query.trim()) return;
  
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/search?query=${query}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
  
      const searchResults = response.data;
      console.log("Search results:", searchResults);
  
      if (searchResults.user) {
        // Assurez-vous que `searchResults.user._id` existe et est correct
        navigate(`/users/${searchResults.user._id}`);
      } else if (searchResults.game) {
        // Assurez-vous que `searchResults.game._id` existe et est correct
        navigate(`/games/${searchResults.game._id}`);
      } else {
        console.log("Aucun résultat trouvé");
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
  };

  return (
    <div>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a game or a user"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Met à jour la requête de recherche
        />
        <button type="submit" className={styles.searchButton}>
          <i className={`fa-solid fa-magnifying-glass ${styles.fa}`}></i>
        </button>
      </form>
    </div>
  );
}
