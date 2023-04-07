import { apiKey, instanceEvent } from './instance'
import { SearchDataType } from '../features/Events/EventsReducer'

export const EventsApi = {
   getEvents({ page, searchData }: FilterDataType) {
      return instanceEvent.get(
         `?apikey=${apiKey}&locale=*&page=${page}&city=${searchData.city}&radius=${
            searchData.radius ? searchData.radius : 0
         }&countryCode=${searchData.country}&keyword=${searchData.keyword}&size=10&sort=date,asc`
      )
   },
}

export type FilterDataType = {
   page: number
   searchData: SearchDataType
}
