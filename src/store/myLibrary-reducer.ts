import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";

const initialState = {
    myRecentlyPlayedTracks: [] as SpotifyApi.PlayHistoryObject[],
    mySavedTracks: [] as SpotifyApi.SavedTrackObject[],
    myTopArtists: [] as  SpotifyApi.ArtistObjectFull[]
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

export const getMyTopArtists = createAsyncThunk("getMyTopArtists", async (arg, thunkAPI) => {
    let result = await spotifyWebApi.getMyTopArtists()
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
            .addCase(getMyTopArtists.fulfilled, (state, action) => {
                state.myTopArtists = action.payload
            })
    )
})

