import React from "react";
import styles from "./Card.module.css";

const ClothesCard = ({ url, english, transcription, russian }) => {
  return (
    <div className={styles.card}>
    <div className={styles.clothesCard}>
      <img src={url} alt={english} className={styles.image} />
      <h3 className={styles.name}>{english}</h3>
      <p className={styles.transcription}>{transcription}</p>
      <p className={styles.russian}>{russian}</p>
    </div>
    </div>
  );
};

export default ClothesCard;
