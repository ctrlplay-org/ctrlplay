import styles from "./AboutPage.module.scss"


export default function AboutPage() {
  return (
    <div className={`${styles.AboutPage}`}>
      <div className={styles.aboutWebsite}>
        <div className={styles.aboutLogo}>
          <video
            className={`img1 ${styles.video}`}
            src="ctrlplay-logo-animated.mp4"
            alt="logo"
            autoPlay
            muted
            loop
          />
        </div>
        <div className={styles.aboutInfo}>
          <h1>What is CtrlPlay?</h1>
          <h3>CtrlPlay is a game reviewing application where you can add, update and delete your own games whilst receiving reviews from other users!</h3>
        </div>
      </div>

      <div className={styles.aboutCreators}>
        <h1>Who made CtrlPlay?</h1>
        <div className={styles.aboutCreatorsDiv}>
          <a
            href="https://github.com/jlneira-dev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.aboutCard}
          >
            <div className={styles.cardImage}>
              <img src="jose.JPG" alt="Jose" />
            </div>
            <div className={styles.cardContent}>
              <h3>Jose Luis Neira</h3>
              <p>Developer and designer of CtrlPlay.</p>
            </div>
          </a>
          <a
            href="https://github.com/Mael1701"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.aboutCard}
          >
            <div className={styles.cardImage}>
              <img src="mael.jpg" alt="Mael" />
            </div>
            <div className={styles.cardContentMael}>
              <h3>Mael Micout</h3>
              <p>Developer and designer of CtrlPlay.</p>
            </div>
          </a>
        </div>
      </div>
    </div >
  );
}
