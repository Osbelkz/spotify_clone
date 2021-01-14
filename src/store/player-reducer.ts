import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { spotifyWebApi } from "../api/spotify-web-api";

const initialState = {
    currentTrack: null as SpotifyApi.SingleTrackResponse | null
}

export const getTrack = createAsyncThunk<SpotifyApi.SingleTrackResponse, {trackId: string}>
("getTrack", async ({trackId}, thunkAPI) => {
    let result = await spotifyWebApi.getTrack(trackId)
    console.log(result)
    return result.body
})

export const playerSlice = createSlice({
    name: "player",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getTrack.fulfilled, (state, action) => {
                state.currentTrack = action.payload
            })
    )

})


