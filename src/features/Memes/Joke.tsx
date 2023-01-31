import React, {useEffect} from 'react';
import styles from './Joke.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getJoke} from "./jokeReducer";

export const Joke = () => {

    const joke = useAppSelector(state => state.joke.joke)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getJoke())
    }, [])

    return (
        <div className={styles.container}>
            {joke}
        </div>
    );
};

