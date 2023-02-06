import React from 'react';
import styles from './Events.module.css'
import { Pagination} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {getEvents} from './EventsReducer';
import {EventShort} from './EventShort/EventShort';
import {SearchBlock} from "./SearchBlock/SearchBlock";

export const Events = () => {

    const dispatch = useAppDispatch()
    const events = useAppSelector(state => state.events.data._embedded.events)
    const page = useAppSelector(state => state.events.data.page?.number)
    const totalPages = useAppSelector(state => state.events.data.page?.totalPages)
    const searchData=useAppSelector(state => state.events.searchData)
    const error=useAppSelector(state => state.events.error)

    const getEventsHandler = () => {
        dispatch(getEvents({page: 0,searchData}))
    }
    const handleChange = (event: React.ChangeEvent<unknown>, pageNew: number) => {
        dispatch(getEvents({page:pageNew-1,searchData}))
    }

    return (
        <div className={styles.container}>
            <SearchBlock getEventsHandler={getEventsHandler}/>
            {(totalPages!==0 && totalPages) &&
                <div className={styles.eventsBlock} >
                    {events.map(e =>
                        <EventShort key={e.id} {...e}/>
                    )}
                </div>
            }
            {error &&
                <div className={styles.errorBlock}>
                    {error}
                </div>
            }
                <Pagination count={totalPages}
                            page={page?page+1:1}
                            onChange={handleChange}
                            variant="text"
                            color={'primary'}
                            disabled={!totalPages}
                            className={styles.paginator}
                />
        </div>
    );
};

