import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  const [query, setQuery] = useState(""); // Stores the search query
  const [suggestions, setSuggestions] = useState([]); // Stores suggestions
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Hook for navigation

  // Fetch suggestions dynamically
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/search/suggestions`, {
          params: { query },
          headers: { Authorization: `Bearer ${storedToken}` },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(debounceFetch);
  }, [query]);

  // Handle form submission
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
        navigate(`/users/${searchResults.user._id}`);
      } else if (searchResults.game) {
        navigate(`/games/${searchResults.game._id}`);
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setQuery(""); // Clear the input
    setSuggestions([]); // Clear suggestions

    if (suggestion.type === 'user') {
      navigate(`/users/${suggestion._id}`);
    } else if (suggestion.type === 'game') {
      navigate(`/games/${suggestion._id}`);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a game or a user"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className={styles.searchButton}>
          <i className={`fa-solid fa-magnifying-glass ${styles.fa}`}></i>
        </button>
      </form>

      {isLoading && <p className={styles.loading}>Loading...</p>}

      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={styles.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.name} 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

