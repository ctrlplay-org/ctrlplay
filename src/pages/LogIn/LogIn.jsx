import { useState, useContext } from 'react';
import styles from './LogIn.module.scss';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // General error message
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isSignUp, setIsSignUp] = useState(true);
  const [isPublisher, setIsPublisher] = useState(false);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignInClick = () => {
    setIsSignUp(false);
    resetFieldErrors();
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
    resetFieldErrors();
  };

  const handleIsPublisherChange = (e) => {
    setIsPublisher(e.target.value === "yes");
  };

  const resetFieldErrors = () => {
    setEmailError("");
    setPasswordError("");
    setNameError("");
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    resetFieldErrors();

    const requestBody = { email, password, name, isPublisher };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody);
      handleSignInClick();
      setName('');
      setEmail('');
      setPassword('');
      setIsPublisher(false);
    } catch (error) {
      const errorData = error.response.data;
      setErrorMessage(errorData.message || "An error occurred");
      if (errorData.message) {
        if (errorData.message.includes("Email already in use")) setEmailError("Email already in use");
        if (errorData.message.includes("Username already in use")) setNameError("Username already in use");
        if (errorData.message.includes("Password")) setPasswordError(errorData.message);
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    resetFieldErrors();

    const requestBody = { email, password };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody);
      storeToken(response.data.authToken);
      authenticateUser();
      navigate('/');
    } catch (error) {
      const errorData = error.response.data;
      setErrorMessage(errorData.message || "An error occurred");
      if (errorData.message) {
        if (errorData.message.includes("User not found")) setEmailError("User not found");
        if (errorData.message.includes("Incorrect password")) setPasswordError("Incorrect password");
      }
    }
  };

  return (
    <div className={styles.LogIn}>
      <div className={`${styles.container} ${isSignUp ? styles.rightPanelActive : ''}`}>
        <div className={`${styles.containerForm} ${styles.containerSignup}`}>
          <form action="#" className={styles.form} id="form1" onSubmit={handleSignupSubmit}>
            <h2 className={styles.formTitle}>Sign Up</h2>
            <input
              type="text"
              placeholder="User"
              value={name}
              className={styles.input}
              onChange={handleName}
            />
            {nameError && <p className={styles.error}>{nameError}</p>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              className={styles.input}
              onChange={handleEmail}
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
            <input
              type="password"
              placeholder="Password"
              value={password}
              className={styles.input}
              onChange={handlePassword}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 or more characters long"
              required
            />
            {passwordError && <p className={styles.error}>{passwordError}</p>}
            <label>Are you a Publisher?</label>
            <div className={styles.formRadio}>
              <div>
                <input
                  type="radio"
                  id="isPublisher1"
                  name="isPublisher"
                  value="yes"
                  onChange={handleIsPublisherChange}
                  checked={isPublisher === true}
                />
                <label htmlFor="isPublisher1">Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="isPublisher2"
                  name="isPublisher"
                  value="no"
                  onChange={handleIsPublisherChange}
                  checked={isPublisher === false}
                />
                <label htmlFor="isPublisher2">No</label>
              </div>
            </div>
            <button className={styles.btn}>Sign Up</button>
          </form>
          {errorMessage && <p className={`${styles.error} ${styles.generalError}`}>{errorMessage}</p>}
        </div>
        <div className={`${styles.containerForm} ${styles.containerSignin}`}>
          <form action="#" className={styles.form} id="form2" onSubmit={handleLoginSubmit}>
            <h2 className={styles.formTitle}>Sign In</h2>
            <input
              type="email"
              placeholder="Email"
              className={styles.input}
              onChange={handleEmail}
            />
            {emailError && <p className={styles.error}>{emailError}</p>}
            <input
              type="password"
              placeholder="Password"
              className={styles.input}
              onChange={handlePassword}
            />
            {passwordError && <p className={styles.error}>{passwordError}</p>}
            <a href="#" className={styles.link}>Forgot your password?</a>
            <button className={styles.btn}>Sign In</button>
          </form>
          {errorMessage && <p className={`${styles.error} ${styles.generalError}`}>{errorMessage}</p>}
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
