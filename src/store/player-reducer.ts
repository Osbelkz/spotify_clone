import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";

const initialState = {
    currentTrack: null as SpotifyApi.SingleTrackResponse | null,
    queue: [] as string[],

}

export const getTrack = createAsyncThunk<SpotifyApi.SingleTrackResponse, { trackId: string }>
("getTrack", async ({trackId}, thunkAPI) => {
    let result = await spotifyWebApi.getTrack(trackId)
    console.log(result)
    return result.body
})


export const playerSlice = createSlice({
    name: "player",
    initialState: initialState,
    reducers: {
        setPlayerQueue: (state, action: PayloadAction<string[]>) => {
            state.queue = action.payload
        },
    },
    extraReducers: builder => (
        builder
            .addCase(getTrack.fulfilled, (state, action) => {
                state.currentTrack = action.payload
            })
    )

})


export const {setPlayerQueue} = playerSlice.actions
