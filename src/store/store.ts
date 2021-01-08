import {combineReducers} from "redux";
import {appSlice} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import { homeSlice } from "./home-reducer";


const rootReducer = combineReducers({
    app: appSlice.reducer,
    home: homeSlice.reducer
})


export const store = configureStore({
    reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof store.getState>
