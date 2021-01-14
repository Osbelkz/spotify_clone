import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";

const initialState = {
    myRecentlyPlayedTracks: [] as Array<SpotifyApi.PlayHistoryObject>,
    mySavedTracks: [] as Array<SpotifyApi.SavedTrackObject>
}

export type MyLibraryStateType = typeof initialState

export const getMyRecentlyPlayedTracks = createAsyncThunk
("getMyRecentlyPlayedTracks", async (arg, thunkAPI) => {
    let result = await spotifyWebApi.getMyRecentlyPlayedTracks()
    return result.body.items
})
export const getMySavedTracks = createAsyncThunk
("getMySavedTracks", async (arg, thunkAPI) => {
    let result = await spotifyWebApi.getMySavedTracks()
    return result.body.items
})

export const myLibrarySlice = createSlice({
    name: "myLibrary",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getMyRecentlyPlayedTracks.fulfilled, (state, action) => {
                state.myRecentlyPlayedTracks = action.payload
            })
            .addCase(getMySavedTracks.fulfilled, (state, action) => {
                state.mySavedTracks = action.payload
            })
    )
})

