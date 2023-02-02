import React from 'react';
import styles from './Events.module.css'
import {Button, Pagination} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getEvents} from './EventsReducer';
import {EventShort} from './EventShort/EventShort';

export const Events = () => {

    const dispatch = useAppDispatch()
    const events = useAppSelector(state => state.events.data._embedded.events)
    const page = useAppSelector(state => state.events.data.page?.number)
    const totalPages = useAppSelector(state => state.events.data.page?.totalPages)

    const getEventsHandler = () => {
        dispatch(getEvents({page: 0}))
    }
    const handleChange = (event: React.ChangeEvent<unknown>, pageNew: number) => {
        dispatch(getEvents({page:pageNew-1}))
    }

    return (
        <div className={styles.container}>
            <Button onClick={getEventsHandler}> get events</Button>
            {events.map(e =>
                <EventShort key={e.id} {...e}/>
            )}
            <Pagination count={totalPages}
                        page={page!+1}
                        onChange={handleChange}
                        color={'primary'}
                       />
        </div>
    );
};

