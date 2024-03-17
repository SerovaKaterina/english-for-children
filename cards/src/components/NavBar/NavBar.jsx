import React from "react";
import './navbar.module.css';
import { Link } from 'react-router-dom'

function NavBar() {
    return (
        <div className={styles.nav_container}>
        <nav className={styles.nav}>
            <ul className={styles.links}>
                <li >
                    <Link to="/table" className={styles.links_li}>Table</Link>
                </li>
                <li>
                    <Link to="/game" className={styles.links_li}>Game</Link>
                </li>
            </ul>
        </nav>
    </div>
)
    }
export default NavBar;
