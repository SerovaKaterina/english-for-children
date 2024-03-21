import React, { useState } from 'react';
import TransportCard from './TransportCard'; 
import styles from './Carousel.module.css';

function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  return (
    <div className={styles.carousel}>
      <button className={styles.prev}  onClick={prevSlide}>Prev
      </button>
      {items.map((item, index) => (
        <div
          key={index}
          className={index === currentIndex ? styles.active : styles.inactive}
        >
          <TransportCard
            url={item.url}
            english={item.english}
            transcription={item.transcription}
            russian={item.russian}
          />
        </div>
      ))}
      <button className={styles.next} onClick={nextSlide}>next</button>
    </div>
  );
}

export default Carousel;