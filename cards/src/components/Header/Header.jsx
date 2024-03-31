import React from "react";
import styles from "./Header.module.css";
import imgBoy from "../../images/boy.png";
import imgGirl from "../../images/girl.png";
import imgVector from "../../images/Vector.png";

function Header() {
    return (
        <div className= {styles.header}>
            <div className={styles.start}>
            <div className={styles.logo}>A B C</div>
            <img src={imgVector} alt="vector" className={styles.vector}/>
            </div>
            <div className={styles.header_name}><h1>ENGLISH EASY & SIMPLE</h1> </div>
            <div className={styles.header_img}>
            <img src={imgBoy} alt="boy" className={styles.img_boy} />
            <img src={imgGirl} alt="girl" className={styles.img_girl} /> 
            </div>
        </div>
    )
}
export default Header;