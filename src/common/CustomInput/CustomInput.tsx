import React, { ChangeEvent } from 'react';
import {Input} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {setCity} from "../../features/Events/EventsReducer";

export const CustomInput = () => {

    const dispatch=useAppDispatch()
    const city=useAppSelector(state => state.events.searchData.city)

    const onChangeHandler=(e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        dispatch(setCity({city:e.currentTarget.value}))
    }

    return (
        <div>
            <Input placeholder="City"
                   color="primary"
                   sx={{color:'white'}}
                   value={city}
                   onChange={onChangeHandler}
            />
        </div>
    );
};
