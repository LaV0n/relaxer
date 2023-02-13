import React from 'react';
import styles from './Header.module.css'
import {NavLink} from "react-router-dom";
import logoImg from './../../assets/img/10368_2.jpg'

export const Header = () => {
    return (
        <div className={styles.container}>
            <img src={logoImg} alt="0" className={styles.logoImg}/>
            <NavLink to={'/joke'} className={styles.link}>Jokes</NavLink>
            <NavLink to={'/'}  className={styles.link}>Events</NavLink>
        </div>
    );
};

