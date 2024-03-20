import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css'

function NavBar() {
  return (
    <div className={styles.navbar}>
      <ul className={styles.links}>
        <li>
          <Link to="/" className={styles.links1}>Table</Link>
        </li>
        <li>
          <Link to="/cards" className={styles.links1}>Cards</Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;