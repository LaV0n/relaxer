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
        height:number
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
    radius:number | null
}

type InitialStateType={
    data:ResponseDataType
    error:string
    loading:boolean
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
    loading:false,
    searchData:{
        keyword:'',
        country:'',
        city:'',
        radius:null
    }
}

const slice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        setCity(state,action:PayloadAction<string>){
            state.searchData.city=action.payload
        },
        setKeyword(state,action:PayloadAction<string>){
            state.searchData.keyword=action.payload
        },
        setRadius(state,action:PayloadAction<number>){
            state.searchData.radius=action.payload
        },
        setCountry(state,action:PayloadAction<string>){
            state.searchData.country=action.payload
        },
        setLoading(state,action:PayloadAction<boolean>){
            state.loading=action.payload
        }
    },
    extraReducers:builder => {
        builder.addCase(getEvents.rejected,(state, action)=>{
            state.data._embedded.events=[]
            state.error=action.payload ? action.payload.error : 'unknown error, please try again later'
        })
        builder.addCase(getEvents.fulfilled,(state, action)=>{
            if(action.payload.page?.totalElements===0){
                state.error='NO EVENTS'
                state.data.page=action.payload.page
                state.data._embedded.events=[]
            }else{
                state.error=''
                state.data=action.payload
            }
        })
    }
})

export const getEvents = createAsyncThunk<ResponseDataType,FilterDataType,{ rejectValue: { error: string } }>(
    'events/getEvents',
    async (filter, {dispatch,rejectWithValue}) => {
        dispatch(setLoading(true))
        try {
            const res = await EventsApi.getEvents(filter)
            dispatch(setLoading(false))
            return res.data
        } catch (err) {
            const error = errorAsString(err)
            dispatch(setLoading(false))
            return rejectWithValue({error})
        }
    }
)

export const eventsReducer = slice.reducer
export const {setCity,setKeyword,setRadius,setCountry,setLoading}=slice.actions