import React from 'react';
import styles from './Events.module.css'
import {Button} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store";
import { getEvents } from './EventsReducer';
import { EventShort } from './EventShort/EventShort';

export const Events = () => {

    const dispatch=useAppDispatch()
    const events=useAppSelector(state => state.events.data._embedded.events)

    const getEventsHandler=()=>{
        dispatch(getEvents())
    }

    return (
        <div className={styles.container}>
            <Button onClick={getEventsHandler}> get events</Button>
            {events.map(e=>
                <EventShort key={e.id} {...e}/>
            )}
        </div>
    );
};

