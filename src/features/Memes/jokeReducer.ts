import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {errorAsString} from "../../common/utiles/errorAsString";
import {humorApi, ReqType} from "../../api/humor-api";
import {AppRootStateType} from "../../app/store";

export type CategoryType = 'Programming' | 'Misc' | 'Dark' | 'Pun' | 'Spooky' | 'Christmas' | 'Any'
type FlagsType = {
    [nsfw:string]: boolean
    religious: boolean
    political: boolean
    racist: boolean
    sexist: boolean
    explicit: boolean
}

type JokeType = {
    error: boolean
    category: CategoryType[]
    joke: string
    flags: FlagsType
}

const initialState:JokeType = {
    error: false,
    category: ["Any"],
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
            state.category=[...state.category,action.payload.category]
          console.log(state.category)

        },
        delCategory(state, action: PayloadAction<{ category: CategoryType }>) {
            state.category=state.category.filter(c=>c!==action.payload.category)
        },
        setFlags(state, action: PayloadAction<{ flags: FlagsType }>) {
            state.flags = action.payload.flags
        }
    },
    extraReducers: (builder) =>
        builder.addCase(getJoke.fulfilled, (state, action) => {
            state.joke = action.payload.joke
            state.category=action.payload.category
        })

})

export const getJoke = createAsyncThunk<JokeType, undefined, { rejectValue: { error: string } }>(
    'jokes/getJoke',
    async (_, {getState, rejectWithValue}) => {
        const {category,flags} = (getState() as AppRootStateType).joke
        const req: ReqType = {
            category: category.toString(),
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