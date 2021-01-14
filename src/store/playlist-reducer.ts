import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";

const initialState = {
    playlist: null as SpotifyApi.SinglePlaylistResponse | null,
}

export const getPlaylist = createAsyncThunk<SpotifyApi.SinglePlaylistResponse, {id: string}>
("getPlaylist", async ({id}, thunkAPI) => {
    let result = await spotifyWebApi.getPlaylist(id)
    return result.body
})

export const playlistSlice = createSlice({
    name: "playlist",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getPlaylist.fulfilled, (state, action) => {
                state.playlist = action.payload
            })
    )
})

