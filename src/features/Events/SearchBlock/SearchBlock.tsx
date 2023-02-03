import React from 'react';
import styles from './SearchBlock.module.css'
import {Button} from "@mui/material";
import {CustomInput} from "../../../common/CustomInput/CustomInput";
import {useAppSelector} from "../../../app/store";

type SearchBlockType={
    getEventsHandler:()=>void
}

export const SearchBlock = ({getEventsHandler}:SearchBlockType) => {

    const city=useAppSelector(state => state.events.searchData.city)
    const keyword=useAppSelector(state => state.events.searchData.keyword)
    const radius=useAppSelector(state => state.events.searchData.radius)
    const country=useAppSelector(state => state.events.searchData.country)

    return (
        <fieldset >
            <legend>Search filter</legend>
            <div className={styles.filterBlock}>
                <CustomInput type="Keyword" value={keyword}/>
                <CustomInput type="City" value={city}/>
                <CustomInput type="Country" value={country}/>
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

