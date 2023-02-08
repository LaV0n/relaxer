import {Box, Modal } from '@mui/material';
import React from 'react';
import styles from './EventFull.module.css'
import {EventDataType} from "../EventsReducer";
import iconTicket from '../../../assets/icon/icons8-new-ticket-100.png'
import {DataFormat} from "../../../common/utiles/DataFormat";

type EventFullType={
    isOpen:boolean
    handleClose:()=>void
    currentEvent:EventDataType
}

export const EventFull = ({isOpen,handleClose,currentEvent}:EventFullType) => {

    let backGroundImg=currentEvent.images.find(i=>i.height>1000)!.url
    let isOnSale=currentEvent.dates.status.code==='onsale'

        return (
            <Modal open={isOpen} onClose={handleClose}>
                <Box className={styles.container}>
                    <div className={styles.descriptionBlock} style={{backgroundImage:`url(${backGroundImg})`}}>
                        <div className={styles.name}>
                            {currentEvent.name}
                        </div>
                        <div className={styles.place}>
                            <p><span>date:</span> {DataFormat(currentEvent.dates.start.localDate)}</p>
                            <p><span>time:</span> {currentEvent.dates.start.localTime}</p>
                            <p><span>city:</span> {currentEvent._embedded?.venues[0].city.name} ({currentEvent._embedded?.venues[0].country.name})</p>
                            <p><span>place:</span> {currentEvent._embedded.venues[0].name}</p>
                        </div>
                    </div>
                    <div className={styles.priceBlock}>
                        <div className={styles.status}
                             style={{border:`3px solid ${isOnSale?'green':'red'}`}}>
                            {currentEvent.dates.status.code}
                        </div>
                        { currentEvent.priceRanges?.map((p,index)=>
                                <div className={styles.prices} key={index}>
                                    <div>{p.type}</div>
                                    <div>{p.min} - {p.max} {p.currency}</div>
                                </div>
                            )
                        }
                        <a href={currentEvent.url}>
                            <img src={iconTicket} alt="0" className={styles.ticketIcon}/>
                        </a>
                        {
                            currentEvent.seatmap &&
                            <img src={currentEvent.seatmap.staticUrl} alt="0" className={styles.seatmapImg}/>
                        }
                    </div>
                </Box>
            </Modal>
        );

};