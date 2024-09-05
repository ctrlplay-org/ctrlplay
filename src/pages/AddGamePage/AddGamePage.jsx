import styles from "./AddGamePage.module.scss";

export default function AddGamePage() {
  return (
    <div className={styles.AddGamePage}>
      <h1 className={styles.h1}>Add a Game</h1>
      <form className={styles.addGameForm}>

        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Enter the game name"
            className={styles.inputField}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="year">Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            required
            placeholder="Enter the year it was created"
            className={styles.inputField}
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            required
            placeholder="Enter the game genre(s)"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Image URL:</label>
          <input
            type="url"
            id="image"
            name="image"
            required
            placeholder="Enter the game image URL"
            className={styles.inputField}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Create Game
        </button>
      </form>
    </div>
  );
}