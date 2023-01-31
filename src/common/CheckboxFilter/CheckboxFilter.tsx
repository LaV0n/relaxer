import React from 'react';
import {Checkbox, FormControlLabel} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {addCategory, CategoryType, delCategory,} from "../../features/Memes/jokeReducer";

type CheckboxFilterType = {
    label: CategoryType
}

export const CheckboxFilter = ({label}: CheckboxFilterType) => {

    const dispatch = useAppDispatch()
    const category=useAppSelector(state => state.joke.category)

    const onChangeHandler = () => {
        if(category.includes(label)){
            dispatch(delCategory({category: label}))
        }else {
            dispatch(addCategory({category: label}))
        }
    }

    return (
        <div>
            <FormControlLabel label={label} control={
                <Checkbox checked={category.includes(label)} onChange={onChangeHandler}/>
            }/>
        </div>
    );
};

