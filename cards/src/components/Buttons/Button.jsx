import React from "react";
import styles from "./button.module.css";

function Button() {
    return (
        <div className={styles.button}>
            <button className={styles.button_btn}>Выбрать категорию</button>
        </div>
    )
}
export default Button;