import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";
import {getArrContainInMySavedTracks} from "../helpers/helpers";

const initialState = {
    album: null as SpotifyApi.SingleAlbumResponse | null,
    containsMySavedTracks: [] as boolean[],
}

export const getAlbum = createAsyncThunk
("getAlbum", async ({id}: {id: string}, thunkAPI) => {
    let result = await spotifyWebApi.getAlbum(id)

    let listId = result.body.tracks.items.map(track => track.id)

    return {album: result.body, containsMySavedTracks: await getArrContainInMySavedTracks(listId)}
})

export const toggleFromYourSavedTracksAlbum = createAsyncThunk
("toggleFromYourSavedTracksAlbum",
    async ({trackId, value, index}: {trackId: string, value: boolean, index: number}, thunkAPI) => {
    if (value) {
        let result = await spotifyWebApi.removeFromMySavedTracks([trackId])
    } else {
        let result = await spotifyWebApi.addToMySavedTracks([trackId])
    }
    return {index: index}
})


export const albumSlice = createSlice({
    name: "album",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getAlbum.fulfilled, (state, action) => {
                Object.assign(state, action.payload)
            })
            .addCase(toggleFromYourSavedTracksAlbum.fulfilled, (state, action) => {
                state.containsMySavedTracks[action.payload.index] = !state.containsMySavedTracks[action.payload.index]
            })
    )
})
