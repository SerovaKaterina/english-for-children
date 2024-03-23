import React, { useState } from "react";
import styles from "./Cards.module.css";

const Cards = ({ onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    setIsOpen(false); // Закрываем выпадающее меню после выбора категории
  };

  return (
    <div className={styles.button}>
      {isOpen ? null : (
        <button className={styles.button_btn} onClick={toggleDropdown}>
          Categories
        </button>
      )}
      {isOpen && (
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
            onClick={() => handleCategoryClick(" Игрушки")}
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
      )}
    </div>
  );
};

export default Cards;