import styles from "./LogIn.module.scss"

export default function LogIn() {

    return (
        <div className={styles.loginContainer}>
      <h1 className={styles.h1}>Log In</h1>
      <form className={styles.loginForm}>
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
            placeholder="Enter your password"
            className={styles.inputField}
          />
        </div>
        <button type="submit" className={styles.loginButton}>
          Log In
        </button>
      </form>
    </div>
    )
    
}