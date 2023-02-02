import {apiKey, instanceEvent} from "./instance";

export const EventsApi={
    getEvents({page}:FilterDataType){
        return instanceEvent.get(`?apikey=${apiKey}&locale=pl&page=${page}&size=5`)
    }
}

export type FilterDataType={
    page?:number
}