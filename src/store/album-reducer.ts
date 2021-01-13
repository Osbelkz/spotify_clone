import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";

const initialState = {
    album: null as SpotifyApi.SingleAlbumResponse | null,
}

export const getAlbum = createAsyncThunk<SpotifyApi.SingleAlbumResponse, {id: string}>
("getAlbum", async ({id}, thunkAPI) => {
    let result = await spotifyWebApi.getAlbum(id)
    return result
})

export const albumSlice = createSlice({
    name: "album",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getAlbum.fulfilled, (state, action) => {
                state.album = action.payload
            })
    )
})

