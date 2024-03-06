import React, { useState } from "react";
import styles from "./Button.module.css";

const Button = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.button}>
      <button className={styles.button_btn} onClick={toggleDropdown}>
        Выбрать категорию
      </button>
      {isOpen && (
        <div className={styles.dropdown_content}>
          <button className={styles.dropdown_btn}>Транспорт</button>
          <button className={styles.dropdown_btn}>Одежда</button>
          <button className={styles.dropdown_btn}>Игрушки</button>
          <button className={styles.dropdown_btn}>Семья</button>
        </div>
      )}
    </div>
  );
};

export default Button;