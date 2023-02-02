import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import {jokeReducer} from "../features/Memes/jokeReducer";
import {eventsReducer} from "../features/Events/EventsReducer";

const rootReducer = combineReducers({
    joke:jokeReducer,
    events:eventsReducer
})

export const store = configureStore({ reducer: rootReducer })
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatchType = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatchType>()

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store;