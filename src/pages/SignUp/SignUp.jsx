import styles from "./SignUp.module.scss"

export default function SignUp() {
    
    return (
        <div className={styles.signInContainer}>
      <h1 className={styles.h1}>Sign Up</h1>
      <form className={styles.signInForm}>
        <div className={styles.formGroup}>
          <label htmlFor="fullName">Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            placeholder="Enter your name"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Create your password"
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword">Confirm your Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            placeholder="Confirm your password"
            className={styles.inputField}
          />
        </div>

        <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Are you a game publisher ?</label>
            <div className={styles.publisher}>
                <input type="radio" id="dewey" name="drone" value="yes" />
                <label htmlFor="dewey">Yes</label>
                <input type="radio" id="dewey" name="drone" value="no" />
                <label htmlFor="no">No</label>
            </div>
        </div>
        <button type="submit" className={styles.signInButton}>
          Sign Up
        </button>
      </form>
    </div>
    )
}