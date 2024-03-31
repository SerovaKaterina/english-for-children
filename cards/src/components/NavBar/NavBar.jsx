
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

function NavBar({ onTableClick }) {
  return (
    <div className={styles.navbar}>
      <ul className={styles.links}>
        {/* ссылка на таблицу */}
        <li>
          <Link to="/table" onClick={onTableClick} className={styles.links1}>
            Table
          </Link>
        </li>
        {/* ссылка на карточки */}
        <li>
          <Link to="/cards" className={styles.links1}>Cards</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;