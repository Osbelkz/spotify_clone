import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";
import { getArrContainInMySavedTracks } from "../helpers/helpers";

const initialState = {
    playlist: null as SpotifyApi.SinglePlaylistResponse | null,
    containsMySavedTracks: [] as boolean[]
}

export const getPlaylist = createAsyncThunk
("getPlaylist", async ({id}: { id: string }, thunkAPI) => {

    let playlist = await spotifyWebApi.getPlaylist(id)

    let listId: string[] = playlist.body.tracks.items.map(track => track.track.id)

    return {playlist: playlist.body, containsMySavedTracks: await getArrContainInMySavedTracks(listId)}
})

export const playlistSlice = createSlice({
    name: "playlist",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getPlaylist.fulfilled, (state, action) => {
                Object.assign(state, action.payload)
            })
    )
})

