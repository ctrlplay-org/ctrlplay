import styles from "./AboutPage.module.scss"


export default function AboutPage() {
  return (
    <div className={`${styles.AboutPage}`}>
      <div className={styles.aboutInfo}>
        <h1>What is Moodify?</h1>
        <h3>Moodify is an easy-to-use application where you can select the mood you are feeling and songs will be automatically recommended to you. You are also able to create personalised playlists with these available songs to specify a particular vibe you are looking for!</h3>
      </div>
      <div className={styles.aboutCreators}>
        <h1>Who made Moodify?</h1>
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
              <p>Developer and designer of Moodify.</p>
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
              <p>Developer and designer of Moodify.</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}