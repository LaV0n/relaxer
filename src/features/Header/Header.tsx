import React from 'react';
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div className={styles.container}>
            header
            <NavLink to={'/joke'} >   joke   </NavLink>
            <NavLink to={'/'} >   Events   </NavLink>
        </div>
    );
};

