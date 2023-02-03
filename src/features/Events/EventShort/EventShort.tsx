import React from 'react';
import styles from './EventShort.module.css'
import {EventDataType} from "../EventsReducer";
import {DataFormat} from "../../../common/utiles/DataFormat";

export const EventShort = ({name,images,dates,_embedded}: EventDataType) => {
    return (
        <div className={styles.container}>
            <img src={images[0].url} alt="0"/>
            <div className={styles.description}>
                <div className={styles.name}>{name}</div>
                <div>{DataFormat(dates.start.localDate)}</div>
                <div className={styles.city}>{_embedded.venues[0].city.name}</div>
            </div>
            <div className={styles.status}
                 style={dates.status.code==='onsale'?{color:'green'}:{color:'red'}}>
                {dates.status.code}
            </div>
        </div>
    );
};
