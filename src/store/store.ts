import {combineReducers} from "redux";
import {appSlice} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import { homeSlice } from "./home-reducer";
import { playerSlice } from "./player-reducer";


const rootReducer = combineReducers({
    app: appSlice.reducer,
    home: homeSlice.reducer,
    player: playerSlice.reducer,
})


export const store = configureStore({
    reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof store.getState>
