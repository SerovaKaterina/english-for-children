
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

function NavBar({ onTableClick }) {
  return (
    <div className={styles.navbar}>
      <ul className={styles.links}>
        <li>
          {/* Вызываем функцию onTableClick при клике на ссылку "Table" */}
          <Link to="/table" onClick={onTableClick} className={styles.links1}>
            Table
          </Link>
        </li>
        <li>
          <Link to="/cards" className={styles.links1}>Cards</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;