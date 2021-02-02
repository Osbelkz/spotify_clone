import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";

const initialState = {
    myTopArtists: [] as  SpotifyApi.ArtistObjectFull[]
}

export type MyLibraryStateType = typeof initialState


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
            .addCase(getMyTopArtists.fulfilled, (state, action) => {
                state.myTopArtists = action.payload
            })
    )
})

