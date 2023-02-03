import React from 'react';
import styles from './SearchBlock.module.css'
import {Button} from "@mui/material";
import {CustomInput} from "../../../common/CustomInput/CustomInput";

type SearchBlockType={
    getEventsHandler:()=>void
}

export const SearchBlock = ({getEventsHandler}:SearchBlockType) => {
    return (
        <fieldset className={styles.filterBlock}>
            <legend>Search filter</legend>
            <CustomInput/>
            <Button onClick={getEventsHandler}
                    variant="outlined"
                    color="inherit"
                    style={{color:'white'}}
            >
                get events
            </Button>
        </fieldset>
    );
};

