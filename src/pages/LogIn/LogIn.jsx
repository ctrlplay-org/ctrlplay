import React, { useState } from 'react';
import styles from './LogIn.module.scss'; 

export default function LogIn() {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  return (
    <div className={styles.LogIn}>
      <div className={`${styles.container} ${isSignUp ? styles.rightPanelActive : ''}`}>
        <div className={`${styles.containerForm} ${styles.containerSignup}`}>
          <form action="#" className={styles.form} id="form1">
            <h2 className={styles.formTitle}>Sign Up</h2>
            <input type="text" placeholder="User" className={styles.input} />
            <input type="email" placeholder="Email" className={styles.input} />
            <input type="password" placeholder="Password" className={styles.input} />
            <button className={styles.btn}>Sign Up</button>
          </form>
        </div>

        <div className={`${styles.containerForm} ${styles.containerSignin}`}>
          <form action="#" className={styles.form} id="form2">
            <h2 className={styles.formTitle}>Sign In</h2>
            <input type="email" placeholder="Email" className={styles.input} />
            <input type="password" placeholder="Password" className={styles.input} />
            <a href="#" className={styles.link}>Forgot your password?</a>
            <button className={styles.btn}>Sign In</button>
          </form>
        </div>

        <div className={styles.containerOverlay}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <button className={styles.btn} onClick={handleSignInClick}>Sign In</button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <button className={styles.btn} onClick={handleSignUpClick}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
