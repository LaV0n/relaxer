import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {errorAsString} from "../../common/utiles/errorAsString";
import {humorApi, ReqType} from "../../api/humor-api";
import {AppRootStateType} from "../../app/store";

export type CategoryType = 'Programming' | 'Misc' | 'Dark' | 'Pun' | 'Spooky' | 'Christmas' | 'Any'
type FlagsDataType = {
    [nsfw:string]: boolean
    religious: boolean
    political: boolean
    racist: boolean
    sexist: boolean
    explicit: boolean
}
export type FlagsType= 'nsfw' | 'religious' |'political' |'racist'|'sexist'| 'explicit'
type JokeType = {
    error: boolean
    categoryArray: CategoryType[]
    category:CategoryType
    joke: string
    flags: FlagsDataType
    message:string
}

const initialState:JokeType = {
    error: false,
    message:'',
    categoryArray: ["Any"],
    category:'Any',
    joke: '',
    flags: {
        nsfw: false,
        religious: false,
        political: false,
        racist: true,
        sexist: false,
        explicit: false
    }
}

const slice = createSlice({
    name: 'jokes',
    initialState,
    reducers: {
        addCategory(state, action: PayloadAction<{ category: CategoryType }>) {
            if(action.payload.category==='Any'){
                state.categoryArray=['Any']
            }else{
                state.categoryArray=[...state.categoryArray.filter(c=>c!=='Any'),action.payload.category]
            }
        },
        delCategory(state, action: PayloadAction<{ category: CategoryType }>) {
            state.categoryArray=state.categoryArray.filter(c=>c!==action.payload.category)
        },
        setFlags(state, action: PayloadAction<{ flag: FlagsType }>) {
            state.flags[action.payload.flag] = !state.flags[action.payload.flag]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getJoke.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.message = action.payload.message
            } else {
                state.message = ''
            }
            state.joke = action.payload.joke
            state.category = action.payload.category
        })
        builder.addCase(getJoke.rejected, (state, action) => {
            state.message=action.payload ? action.payload.error : 'unknown error, please try again later'
        })
    }
})

export const getJoke = createAsyncThunk<JokeType, undefined, { rejectValue: { error: string } }>(
    'jokes/getJoke',
    async (_, {getState, rejectWithValue}) => {
        const {categoryArray,flags} = (getState() as AppRootStateType).joke
        const req: ReqType = {
            category: categoryArray.toString(),
            flags: Object.keys(flags).filter(f=>flags[f]).toString()
        }
        try {
            const res = await humorApi.getJoke(req)
            return res.data
        } catch (err) {
            const error = errorAsString(err)
            return rejectWithValue({error})
        }
    }
)


export const jokeReducer = slice.reducer
export const {addCategory,delCategory,setFlags}= slice.actions