import React, {useState} from "react";
import styles from "./button.module.css";


const CategoryDropdown = () =>{
    const [isOpen, setIsOpen] =useState(false);

    const toggleDropdown = () =>{
        setIsOpen(!isOpen);
    };
    return (
        <div className= {styles.button}>
            <button className= {styles.button_btn}onClick={toggleDropdown}>Выбрать категорию</button>
            {isOpen &&(
            <select className= {styles.select_btn}>
            <option value="category1">Транспорт</option>
            <option value="category1">Одежда</option>
            <option value="category1">Игрушки</option>
            <option value="category1">Семья</option>
            </select>
            )}
        </div>
    );
};
export default  CategoryDropdown;