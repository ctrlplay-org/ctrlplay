import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Slider.module.scss';

function SliderComponent() {
  const [sliderItems, setSliderItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/games/featured`)
      .then(response => setSliderItems(response.data))
      .catch(error => console.error('Error fetching slider items:', error));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sliderItems.length) % sliderItems.length);
  };

  const getTransformValue = () => {
    return `translateX(-${currentIndex * 100}%)`;
  };

  if (sliderItems.length === 0) return null; // Render nothing if no items

  return (
    <div className={styles.slider}>
      <div className={styles.list} style={{ transform: getTransformValue() }}>
        {sliderItems.map((item, index) => (
          <div
            key={item._id}
            className={styles.item}
          >
            <img src={item.image} alt={item.name} />
            <div className={styles.content}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.type}>{item.type}</div>
              <div className={styles.description}>{item.description}</div>
              <div className={styles.button}>
                <button onClick={() => console.log(`See more about ${item._id}`)}>SEE MORE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.thumbnail}>
        {sliderItems.map((item, index) => (
          <div
            key={item._id}
            className={styles.item}
            onClick={() => setCurrentIndex(index)}
          >
            <img src={item.image} alt={item.name} />
          </div>
        ))}
      </div>

      <div className={styles.nextPrevArrows}>
        <button className={styles.prev} onClick={prevSlide}>&lt;</button>
        <button className={styles.next} onClick={nextSlide}>&gt;</button>
      </div>
    </div>
  );
}

export default SliderComponent;
