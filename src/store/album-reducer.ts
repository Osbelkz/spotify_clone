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

export const albumSlice = createSlice({
    name: "album",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getAlbum.fulfilled, (state, action) => {
                Object.assign(state, action.payload)
            })
    )
})
