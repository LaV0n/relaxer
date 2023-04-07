import React, { useEffect } from 'react'
import styles from './Events.module.css'
import { CircularProgress, Pagination } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/store'
import {
   getEvents,
   SearchDataType,
   setCity,
   setCountry,
   setKeyword,
   setRadius,
} from './EventsReducer'
import { EventShort } from './EventShort/EventShort'
import { SearchBlock } from './SearchBlock/SearchBlock'

export const Events = () => {
   const dispatch = useAppDispatch()
   const events = useAppSelector(state => state.events.data._embedded.events)
   const page = useAppSelector(state => state.events.data.page?.number)
   const totalPages = useAppSelector(state => state.events.data.page?.totalPages)
   const searchData = useAppSelector(state => state.events.searchData)
   const error = useAppSelector(state => state.events.error)
   const isLoading = useAppSelector(state => state.events.isLoading)

   const getEventsHandler = () => {
      dispatch(getEvents({ page: 0, searchData }))
      localStorage.setItem('searchData', JSON.stringify(searchData))
   }
   const handleChange = (event: React.ChangeEvent<unknown>, pageNew: number) => {
      dispatch(getEvents({ page: pageNew - 1, searchData }))
   }

   useEffect(() => {
      const searchDataSave = localStorage.getItem('searchData')
      if (searchDataSave) {
         const searchDataSaveNew: SearchDataType = JSON.parse(searchDataSave)
         dispatch(setKeyword(searchDataSaveNew.keyword))
         dispatch(setCity(searchDataSaveNew.city))
         if (searchDataSaveNew.radius) {
            dispatch(setRadius(searchDataSaveNew.radius))
         }
         dispatch(setCountry(searchDataSaveNew.country))
      }
   }, [])

   return (
      <div className={styles.container}>
         {isLoading && (
            <CircularProgress style={{ position: 'absolute', top: '200px', zIndex: '3' }} />
         )}
         <SearchBlock getEventsHandler={getEventsHandler} />
         {totalPages !== 0 && totalPages && (
            <div className={styles.eventsBlock}>
               {events.map(e => (
                  <EventShort key={e.id} {...e} />
               ))}
            </div>
         )}
         {error && <div className={styles.errorBlock}>{error}</div>}
         <Pagination
            count={totalPages}
            page={page ? page + 1 : 1}
            onChange={handleChange}
            variant="text"
            color={'primary'}
            disabled={!totalPages || isLoading}
            className={styles.paginator}
         />
      </div>
   )
}
