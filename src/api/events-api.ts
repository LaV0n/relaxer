import {apiKey, instanceEvent} from "./instance";

export const EventsApi={
    getEvents({page}:FilterDataType){
        return instanceEvent.get(`?apikey=${apiKey}&locale=pl&page=${page}`)
    }
}

export type FilterDataType={
    page?:number
}