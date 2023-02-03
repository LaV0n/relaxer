import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {errorAsString} from "../../common/utiles/errorAsString";
import {EventsApi, FilterDataType} from "../../api/events-api";

export type EventDataType = {
    name:string
    dates: {
        start: {
            localDate: string
            localTime: string
        }
        status: {
            code:string
        }
    }
    id: string
    url: string
    locate: string
    images:[{
        url:string
        attribution:string
    }]
    priceRanges: [{
        type: string
        currency: string
        min: number
        max: number
    }]
    seatmap:{
        staticUrl:string
    }
    _embedded:{
        venues:[{
            name: string
            id: string
            url: string
            locale: string
            city: {
                name: string
            },
            state: {
                name: string
            },
            country: {
                name:string
                countryCode: string
            }
        }
        ]
    }
}

type PageDataType={
    size: number
    totalElements: number
    totalPages: number
    number: number
}
type ResponseDataType={
    _embedded:{
        events:EventDataType[]
    },
    page:PageDataType | null
}
export type SearchDataType={
    keyword:string
    city:string
    country:string
    radius:number
}

type InitialStateType={
    data:ResponseDataType
    error:string
    searchData:SearchDataType
}

const initialState:InitialStateType = {
    data:{
        _embedded:{
            events:[]
        },
        page:null
    },
    error:'',
    searchData:{
        keyword:'',
        country:'',
        city:'Wroclaw',
        radius:0
    }
}

const slice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setCity(state,action:PayloadAction<{city:string}>){
            state.searchData.city=action.payload.city
        }
    },
    extraReducers:builder => {
        builder.addCase(getEvents.rejected,(state, action)=>{
            state.error=action.payload ? action.payload.error : 'unknown error, please try again later'
        })
        builder.addCase(getEvents.fulfilled,(state, action)=>{
            if(action.payload.page?.totalElements===0){
                state.error='no match'
            }else{
                state.data=action.payload
            }

        })
    }
})

export const getEvents = createAsyncThunk<ResponseDataType,FilterDataType,{ rejectValue: { error: string } }>(
    'events/getEvents',
    async (filter, {rejectWithValue}) => {
        try {
            const res = await EventsApi.getEvents(filter)
            return res.data
        } catch (err) {
            const error = errorAsString(err)
            return rejectWithValue({error})
        }
    }
)

export const eventsReducer = slice.reducer
export const {setCity}=slice.actions