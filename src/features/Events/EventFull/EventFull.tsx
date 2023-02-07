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


        return (
            <Modal open={isOpen} onClose={handleClose}>
                <Box className={styles.container}>
                    <img src={currentEvent.images.find(i=>i.height>1000)!.url}
                         alt="0" className={styles.coverImg}/>
                    <div>
                        {currentEvent.name}
                    </div>
                    {
                        currentEvent.seatmap &&
                        <img src={currentEvent.seatmap.staticUrl} alt="0" className={styles.seatmapImg}/>
                    }
                    <a href={currentEvent.url}>link</a>
                </Box>
            </Modal>
        );

};