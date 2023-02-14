import React from 'react';
import styles from './SearchBlock.module.css'
import {Button} from "@mui/material";
import {CustomInput} from "../../../common/CustomInput/CustomInput";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {CountryInput} from "../../../common/CountryInput/CountryInput";
import {resetFilters} from "../EventsReducer";

type SearchBlockType={
    getEventsHandler:()=>void
}

export const SearchBlock = ({getEventsHandler}:SearchBlockType) => {

    const city=useAppSelector(state => state.events.searchData.city)
    const keyword=useAppSelector(state => state.events.searchData.keyword)
    const radius=useAppSelector(state => state.events.searchData.radius)
    const dispatch=useAppDispatch()

    const clearFilterHandler=()=>{
        dispatch(resetFilters())
        localStorage.clear()
    }

    return (
        <fieldset className={styles.filterContainer}>
            <legend>Search filter</legend>
            <div className={styles.filterBlock}>
                <CustomInput type="Keyword" value={keyword}/>
                <CustomInput type="City" value={city}/>
                <CountryInput/>
                <CustomInput type="Radius" value={radius}/>
                <div className={styles.clearFilter} onClick={clearFilterHandler}>
                    clear all
                </div>
                <Button onClick={getEventsHandler}
                        variant="outlined"
                        color="inherit"
                        style={{color:'white'}}
                >
                    get events
                </Button>
            </div>

        </fieldset>
    );
};

