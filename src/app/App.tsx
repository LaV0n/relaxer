import React from 'react';
import styles from './App.module.css';
import {Header} from "../features/Header/Header";
import {Joke} from "../features/Memes/Joke";

function App() {
    return (
        <div className={styles.App}>
            <Header/>
            <Joke/>
        </div>
    );
}

export default App;
