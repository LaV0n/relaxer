import React from 'react';
import styles from './SearchBlock.module.css'
import {Button} from "@mui/material";
import {CustomInput} from "../../../common/CustomInput/CustomInput";
import {useAppSelector} from "../../../app/store";
import {CountryInput} from "../../../common/CountryInput/CountryInput";

type SearchBlockType={
    getEventsHandler:()=>void
}

export const SearchBlock = ({getEventsHandler}:SearchBlockType) => {

    const city=useAppSelector(state => state.events.searchData.city)
    const keyword=useAppSelector(state => state.events.searchData.keyword)
    const radius=useAppSelector(state => state.events.searchData.radius)

    return (
        <fieldset className={styles.filterContainer}>
            <legend>Search filter</legend>
            <div className={styles.filterBlock}>
                <CustomInput type="Keyword" value={keyword}/>
                <CustomInput type="City" value={city}/>
                <CountryInput/>
                <CustomInput type="Radius" value={radius}/>
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

