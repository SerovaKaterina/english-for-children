import React, { useState } from "react";
import styles from "./Button.module.css";

const Button = ({ onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category) => {
    onSelectCategory(category);
    toggleDropdown();
  };

  return (
    <div className={styles.button}>
      <button className={styles.button_btn} onClick={toggleDropdown}>
          Выберите категорию
      </button>
      {isOpen && (
        <div className={styles.dropdown_content}>
          <button
            className={styles.dropdown_btn}
            onClick={() => handleCategoryClick("Транспорт")}
          >
            Транспорт
          </button>
          <button
            className={styles.dropdown_btn}
            onClick={() => handleCategoryClick("Одежда")}
          >
            Одежда
          </button>
          <button
            className={styles.dropdown_btn}
            onClick={() => handleCategoryClick("Игрушки")}
          >
            Игрушки
          </button>
          <button
            className={styles.dropdown_btn}
            onClick={() => handleCategoryClick("Семья")}
          >
            Семья
          </button>
        </div>
      )}
    </div>
  );
};

export default Button;