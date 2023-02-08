import React, {useState} from 'react';
import styles from './EventShort.module.css'
import {EventDataType} from "../EventsReducer";
import {DataFormat} from "../../../common/utiles/DataFormat";
import {EventFull} from "../EventFull/EventFull";
import {useAppSelector} from "../../../app/store";

export const EventShort = ({name,images,dates,_embedded,id}: EventDataType) => {

    const [isOpen,setIsOpen]=useState(false)
    const events=useAppSelector(state => state.events.data._embedded.events)
    const currentEvent=events.find(e=>e.id===id)

    const handlerClose=()=>{
        setTimeout(()=>setIsOpen(false),50)
    }
    const handlerOpen=()=>{
        setIsOpen(true)
    }

    return (
        <div className={styles.container} onClick={handlerOpen}>
            <img src={images[0].url} alt="0" className={styles.imgCover}/>
            <div className={styles.description}>
                <div className={styles.name}>{name}</div>
                <div>{DataFormat(dates.start.localDate)}</div>
                <div className={styles.city}>{_embedded?.venues[0].city.name}</div>
            </div>
            <div className={styles.status}
                 style={dates.status.code==='onsale'?{color:'green'}:{color:'red'}}>
                {dates.status.code}
            </div>
            <EventFull  currentEvent={currentEvent!} isOpen={isOpen} handleClose={handlerClose}/>
        </div>
    );
};
