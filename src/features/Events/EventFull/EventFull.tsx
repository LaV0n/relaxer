import {Box, Modal } from '@mui/material';
import React from 'react';
import styles from './EventFull.module.css'
import {EventDataType} from "../EventsReducer";

type EventFullType={
    isOpen:boolean
    handleClose:()=>void
    currentEvent:EventDataType
}

export const EventFull = ({isOpen,handleClose,currentEvent}:EventFullType) => {

    let backGroundImg=currentEvent.images.find(i=>i.height>1000)!.url

        return (
            <Modal open={isOpen} onClose={handleClose}>
                <Box className={styles.container}>
                    <div className={styles.descriptionBlock} style={{backgroundImage:`url(${backGroundImg})`}}>
                        <div className={styles.name}>
                            {currentEvent.name}
                        </div>
                        <div className={styles.place}>
                            <p>date: {currentEvent.dates.start.localDate}</p>
                            <p>time: {currentEvent.dates.start.localTime}</p>
                            <p>city: {currentEvent._embedded?.venues[0].city.name}</p>
                            <p>country: {currentEvent._embedded?.venues[0].country.name}</p>
                            <p>{currentEvent.dates.status.code}</p>
                        </div>
                    </div>
                    {
                        currentEvent.seatmap &&
                        <img src={currentEvent.seatmap.staticUrl} alt="0" className={styles.seatmapImg}/>
                    }

                    <div>
                        { currentEvent.priceRanges?.map(p=>
                                <div key={p.min}>
                                    {p.type}
                                    {p.min}
                                    {p.max}
                                    {p.currency}
                                </div>
                            )
                        }
                    </div>
                    <a href={currentEvent.url}>link</a>
                </Box>
            </Modal>
        );

};