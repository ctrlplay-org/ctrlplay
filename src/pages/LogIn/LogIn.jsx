import  { useState, useContext } from 'react';
import styles from './LogIn.module.scss';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isSignUp, setIsSignUp] = useState(true);
  const [isPublisher, setIsPublisher] = useState(false);
 
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);
  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
 
  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleIsPublisherChange = (e) => {
    setIsPublisher(e.target.value === "yes");
  };
  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    const requestBody = { email, password, name, isPublisher };
 
    axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        handleSignInClick();
        setName('');
        setEmail('');
        setPassword('');
        setIsPublisher(false);
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
 
    axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
      .then((response) => {
      
        console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken); 
        authenticateUser(); 
        navigate('/');                                  
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  return (
    <div className={styles.LogIn}>
      {/* sign up */}
      <div className={`${styles.container} ${isSignUp ? styles.rightPanelActive : ''}`}>
        <div className={`${styles.containerForm} ${styles.containerSignup}`}>
          <form action="#" className={styles.form} id="form1" onSubmit={handleSignupSubmit}>
            <h2 className={styles.formTitle}>Sign Up</h2>
            <input type="text" placeholder="User" value={name} className={styles.input} onChange={handleName}/>
            <input type="email" placeholder="Email" value={email} className={styles.input} onChange={handleEmail}/>
            <input type="password" placeholder="Password" value={password} className={styles.input} onChange={handlePassword} />
            <label>Are you a Publisher?</label>
            <div className={styles.formRadio}>
            <div>
                <input type="radio" id="isPublisher1" name="isPublisher" value="yes" onChange={handleIsPublisherChange} checked={isPublisher === true} /> 
                <label htmlFor="isPublisher1">Yes</label>
              </div>
              <div>
                <input type="radio" id="isPublisher2" name="isPublisher" value="no" onChange={handleIsPublisherChange} checked={isPublisher === false} /> 
                <label htmlFor="isPublisher2">No</label>
              </div>
            </div>
            <button className={styles.btn}>Sign Up</button>
          </form>
          { errorMessage && <p className="error-message">{errorMessage}</p> }
        </div>
          {/* sign in */}
        <div className={`${styles.containerForm} ${styles.containerSignin}`}>
          <form action="#" className={styles.form} id="form2" onSubmit={handleLoginSubmit}>
            <h2 className={styles.formTitle}>Sign In</h2>
            <input type="email" placeholder="Email" className={styles.input}  onChange={handleEmail}/>
            <input type="password" placeholder="Password" className={styles.input} onChange={handlePassword}/>
            <a href="#" className={styles.link}>Forgot your password?</a>
            <button className={styles.btn}>Sign In</button>
          </form>
          { errorMessage && <p className="error-message">{errorMessage}</p> }
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
