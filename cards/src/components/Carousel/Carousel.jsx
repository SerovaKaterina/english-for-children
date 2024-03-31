import React, { useState, useEffect, useRef } from 'react';
import TransportCard from './TransportCard';
import ClothesCard from './ClothesCard'; 
import styles from './Carousel.module.css';
import prevImg from '../.././images/pngegg.png'
import nextImg from '../.././images/pngegg2.png'

function Carousel({ items, category }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pressed, setPressed] = useState(Array(items.length).fill(false));
  const [wordsLearned, setWordsLearned] = useState(0); // общее количество изученных слов
  const buttonRefs = useRef([]);

  useEffect(() => {
    //устанавливаем фокус на кнопку
    if (buttonRefs.current[currentIndex]) {
      buttonRefs.current[currentIndex].focus();
    }
  }, [currentIndex]);
    //переход к след слайду
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };
    //переход к предыдущемц слайду
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };
    //обработчик клика по карточке
  const handleClick = (index) => {
    setPressed((prevState) => {
      const newPressed = [...prevState];
      newPressed[index] = !newPressed[index];
      return newPressed;
    });
    setWordsLearned((prevWordsLearned) => prevWordsLearned + 1); // увеличиваем общий счетчик
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
                <button
                  ref={el => buttonRefs.current[index] = el}
                  className={styles.translate}
                  onClick={() => handleClick(index)}
                >
                  Перевести
                </button>
              )}
              pressed={pressed[index]}
              wordsLearned={wordsLearned} // передаем общий счетчик в компонент
            />
          ) : (
            <ClothesCard
              url={item.url}
              english={item.english}
              transcription={item.transcription}
              russian={pressed[index] ? item.russian : (
                <button
                  ref={el => buttonRefs.current[index] = el}
                  className={styles.translate}
                  onClick={() => handleClick(index)}
                >
                  Посмотреть перевод
                </button>
              )}
              wordsLearned={wordsLearned} // передаем общий счетчик в компонент
            />
          )}
        </div>
      ))}
      <button className={styles.next} onClick={nextSlide}><img src={nextImg} alt='next' /></button>
      <p>Words Learned: {wordsLearned}</p> {/* отображаем общее количество изученных слов */}
    </div>
  );
}

export default Carousel;