import {apiKey, instanceEvent} from "./instance";

export const EventsApi={
    getEvents(){
        return instanceEvent.get(`?apikey=${apiKey}&locale=pl`)
    }
}