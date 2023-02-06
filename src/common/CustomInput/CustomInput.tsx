import React, { ChangeEvent } from 'react';
import {Input} from "@mui/material";
import {useAppDispatch} from "../../app/store";
import {setCity,  setKeyword, setRadius} from "../../features/Events/EventsReducer";

type CustomInputType={
    value:string | number | null
    type: 'City' | 'Keyword' | 'Radius'
}

export const CustomInput = ({value,type}:CustomInputType) => {

    const dispatch=useAppDispatch()


    const onChangeHandler=(e:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        switch (type){
            case 'City':
               return  dispatch(setCity(e.currentTarget.value));
            case 'Keyword':
                return  dispatch(setKeyword(e.currentTarget.value))
            case 'Radius':
               return  dispatch(setRadius(+e.currentTarget.value))
            default:
                return
        }
    }

    return (
        <div>
            <Input placeholder={type}
                   color="primary"
                   sx={{color:'white'}}
                   value={value?value:''}
                   onChange={onChangeHandler}
            />
        </div>
    );
};
