import {combineReducers} from "redux";
import {appSlice} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import { homeSlice } from "./home-reducer";
import { playerSlice } from "./player-reducer";
import {myLibrarySlice} from "./myLibrary-reducer";
import {albumSlice} from "./album-reducer";
import {playlistSlice} from "./playlist-reducer";
import {artistSlice} from "./artist-reducer";


const rootReducer = combineReducers({
    app: appSlice.reducer,
    home: homeSlice.reducer,
    myLibrary: myLibrarySlice.reducer,
    album: albumSlice.reducer,
    playlist: playlistSlice.reducer,
    artist: artistSlice.reducer,
    player: playerSlice.reducer,
})


export const store = configureStore({
    reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof store.getState>
