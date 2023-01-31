import React from 'react';
import styles from './Joke.module.css'
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getJoke} from "./jokeReducer";
import {CheckboxFilter} from "../../common/CheckboxFilter/CheckboxFilter";
import {Button} from "@mui/material";

export const Joke = () => {

    const joke = useAppSelector(state => state.joke.joke)
    const dispatch = useAppDispatch()

    const getJokeHandler=() => {
        dispatch(getJoke())
    }

    return (
        <div className={styles.container}>
            <div className={styles.filterBlock}>
                <CheckboxFilter label={"Programming"}/>
                <CheckboxFilter label={"Misc"}/>
                <CheckboxFilter label={"Dark"}/>
                <CheckboxFilter label={"Pun"}/>
                <CheckboxFilter label={"Spooky"}/>
                <CheckboxFilter label={"Christmas"}/>
                <CheckboxFilter label={"Any"}/>

            </div>
            <Button onClick={getJokeHandler}
            variant="contained">
                get JOKE
            </Button>
            <div className={styles.jokeBlock}>
                {joke}
            </div>
        </div>
    );
};

