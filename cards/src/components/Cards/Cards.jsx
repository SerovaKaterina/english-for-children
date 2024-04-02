import React, { useState } from "react";
import styles from "./Cards.module.css";

function Cards({ onSelectCategory }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    setSelectedCategory(category); // Установка выбранной категории
  };

  return (
    <div className={styles.dropdown_content}>
      <button
        className={`${styles.dropdown_btn} ${selectedCategory === "Транспорт" ? styles.selected : ""}`}
        onClick={() => handleCategoryClick("Транспорт")}
      >
        Transport
      </button>
      <button
        className={`${styles.dropdown_btn} ${selectedCategory === "Одежда" ? styles.selected : ""}`}
        onClick={() => handleCategoryClick("Одежда")}
      >
        Clothes
      </button>
      <button
        className={`${styles.dropdown_btn} ${selectedCategory === "Игрушки" ? styles.selected : ""}`}
        onClick={() => handleCategoryClick("Игрушки")}
      >
        Toys
      </button>
      <button
        className={`${styles.dropdown_btn} ${selectedCategory === "Семья" ? styles.selected : ""}`}
        onClick={() => handleCategoryClick("Семья")}
      >
        Family
      </button>
    </div>
  );
}

export default Cards;