import React, { useEffect } from "react";
import styles from "./Card.module.css";

const TransportCard = ({ url, english, transcription, russian, handleClick, wordsLearned }) => {
  useEffect(() => {
    // Обновляем компонент при изменении счетчика
  }, [wordsLearned]);

  return (
    <div className={styles.card}>
    <div className={styles.transportCard}>
      <img src={url} alt={english} className={styles.image} />
      <h3 className={styles.name}>{english}</h3>
      <p className={styles.transcription}>{transcription}</p>
      <p className={styles.russian}>{russian}</p>
      <button className={styles.translate} onClick={handleClick}>Перевести</button>
      <p>Words Learned: {wordsLearned}</p> {/* Отображаем общее количество изученных слов */}
    </div>
    </div>
  );
};

export default TransportCard; 