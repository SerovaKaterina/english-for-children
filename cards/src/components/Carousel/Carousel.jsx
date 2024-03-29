import React, { useState } from 'react';
import TransportCard from './TransportCard';
import ClothesCard from './ClothesCard'; 
import styles from './Carousel.module.css';
import prevImg from '../.././images/pngegg.png'
import nextImg from '../.././images/pngegg2.png'

function Carousel({ items, category }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pressed, setPressed] = useState(Array(items.length).fill(false));

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const handleClick = (index) => {
    setPressed((prevState) => {
      const newPressed = [...prevState];
      newPressed[index] = !newPressed[index];
      return newPressed;
    });
  };

  return (
    <div className={styles.carousel}>
      <button className={styles.prev} onClick={prevSlide}><img src={prevImg} alt='prev' /></button>
      {items.map((item, index) => (
        <div
          key={index}
          className={index === currentIndex ? styles.active : styles.inactive}
        >
         {category === 'Транспорт' ? (
  <TransportCard
    url={item.url}
    english={item.english}
    transcription={item.transcription}
    russian={pressed[index] ? item.russian : (
      <button className={styles.translate} onClick={() => handleClick(index)}>Перевести</button>
    )}
    pressed={pressed[index]}
    handleClick={() => handleClick(index)}
  />
) : (
  <ClothesCard
    url={item.url}
    english={item.english}
    transcription={item.transcription}
    russian={pressed[index] ? item.russian : (
      <button className={styles.translate} onClick={() => handleClick(index)}>Посмотреть перевод</button>
    )}
  />
)}
        </div>
      ))}
      <button className={styles.next} onClick={nextSlide}><img src={nextImg} alt='next' /></button>
    </div>
  );
}

export default Carousel;