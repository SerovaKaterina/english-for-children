import React from "react";
import styles from "./Cards.module.css";

function Cards({ onSelectCategory }) {
  //обработчик клика по категории
  const handleCategoryClick = (category) => {
    onSelectCategory(category);
  };

  return (
    <div className={styles.dropdown_content}>
      <button
        className={styles.dropdown_btn}
        onClick={() => handleCategoryClick("Транспорт")}
      >
        Transport
      </button>
      <button
        className={styles.dropdown_btn}
        onClick={() => handleCategoryClick("Одежда")}
      >
        Clothes
      </button>
      <button
        className={styles.dropdown_btn}
        onClick={() => handleCategoryClick("Игрушки")}
      >
        Toys
      </button>
      <button
        className={styles.dropdown_btn}
        onClick={() => handleCategoryClick("Семья")}
      >
        Family
      </button>
    </div>
  );
}

export default Cards;