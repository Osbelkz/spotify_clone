import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";

const initialState = {
    artist: null as SpotifyApi.SingleArtistResponse | null,
    popularTracks: null as SpotifyApi.TrackObjectFull[] | null
}

export const getArtist = createAsyncThunk
("getArtist", async ({id}: {id: string}, thunkAPI) => {
    let [artist, popular] = await Promise.all([spotifyWebApi.getArtist(id), spotifyWebApi.getArtistTopTracks(id, "US")])
    console.log(artist, popular)
    return {artist: artist.body, popularTracks: popular.body.tracks}
})

export const artistSlice = createSlice({
    name: "artist",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getArtist.fulfilled, (state, action) => {
                state.artist = action.payload.artist
                state.popularTracks = action.payload.popularTracks
            })
    )
})

