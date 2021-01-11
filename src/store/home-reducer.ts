import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";

const initialState = {
    displayName: "" as string | undefined,
    myRecentlyPlayedTracks: [] as Array<SpotifyApi.PlayHistoryObject>,
    mySavedTracks: [] as Array<SpotifyApi.SavedTrackObject>
}

export type HomeStateType = typeof initialState

export const getMyInfo = createAsyncThunk
("getMyInfo", async (arg, thunkAPI) => {
    let result = await spotifyWebApi.getMe()
    console.log(result)
    return result.display_name
})

export const getMyRecentlyPlayedTracks = createAsyncThunk
("getMyRecentlyPlayedTracks", async (arg, thunkAPI) => {
    let result = await spotifyWebApi.getMyRecentlyPlayedTracks()
    return result.items
})
export const getMySavedTracks = createAsyncThunk
("getMySavedTracks", async (arg, thunkAPI) => {
    let result = await spotifyWebApi.getMySavedTracks()
    return result.items
})

export const homeSlice = createSlice({
    name: "home",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getMyInfo.fulfilled, (state, action) => {
                state.displayName = action.payload
            })
            .addCase(getMyRecentlyPlayedTracks.fulfilled, (state, action) => {
                state.myRecentlyPlayedTracks = action.payload
            })
            .addCase(getMySavedTracks.fulfilled, (state, action) => {
                state.mySavedTracks = action.payload
            })
    )
})

