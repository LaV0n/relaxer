import React from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {addCategory, CategoryType, delCategory, FlagsType, setFlags,} from "../../features/Memes/jokeReducer";

type CheckboxFilterType = {
    label?: CategoryType
    flag?: FlagsType
}

export const CheckboxFilter = ({label, flag}: CheckboxFilterType) => {

    const dispatch = useAppDispatch()
    const categoryArray = useAppSelector(state => state.joke.categoryArray)
    const flags = useAppSelector(state => state.joke.flags)

    const onChangeHandlerCategory = () => {
        if (categoryArray.includes(label!)) {
            dispatch(delCategory({category: label!}))
        } else {
            dispatch(addCategory({category: label!}))
        }
    }
    const onChangeHandlerFlags = () => {
        dispatch(setFlags({flag: flag!}))
    }

    return (
        <div>
            {label
                ? <FormControlLabel label={label} sx={{color:'white'}} control={
                    <Checkbox checked={categoryArray.includes(label!)} onChange={onChangeHandlerCategory}/>
                }/>
                : <FormControlLabel label={flag} sx={{color:'white'}} control={
                    <Checkbox checked={flags[flag!]} onChange={onChangeHandlerFlags}/>
                }/>

            }
        </div>
    );
};

