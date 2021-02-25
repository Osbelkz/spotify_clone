import {combineReducers} from "redux";
import {appSlice} from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {homeSlice} from "./home-reducer";
import {playerSlice} from "./player-reducer";
import {myLibrarySlice} from "./myLibrary-reducer";
import {artistSlice} from "./artist-reducer";
import {tracklistsSlice} from "./tracklists-reducer";
import {browseSlice} from "./browse-reducer";


const rootReducer = combineReducers({
    app: appSlice.reducer,
    home: homeSlice.reducer,
    browse: browseSlice.reducer,
    myLibrary: myLibrarySlice.reducer,
    artist: artistSlice.reducer,
    player: playerSlice.reducer,
    tracklists: tracklistsSlice.reducer,
})


export const store = configureStore({
    reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof store.getState>
