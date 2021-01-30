import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";
import {getArrContainInMySavedTracks} from "../helpers/helpers";
import {toggleFromYourSavedTracksPlaylist} from "./playlist-reducer";

const initialState = {
    myRecentlyPlayedTracks: {
        tracks: [] as SpotifyApi.PlayHistoryObject[],
        containsMySavedTracks: [] as boolean[]
    },
    mySavedTracks: {
        tracks: [] as SpotifyApi.SavedTrackObject[],
        containsMySavedTracks: [] as boolean[]
    },
    myTopArtists: [] as  SpotifyApi.ArtistObjectFull[]
}

export type MyLibraryStateType = typeof initialState

export const getMyRecentlyPlayedTracks = createAsyncThunk
("getMyRecentlyPlayedTracks", async (arg, thunkAPI) => {
    let tracks = await spotifyWebApi.getMyRecentlyPlayedTracks()

    let listId: string[] = tracks.body.items.map(track => track.track.id)

    return {tracks: tracks.body.items, containsMySavedTracks: await getArrContainInMySavedTracks(listId)}
})
export const getMySavedTracks = createAsyncThunk
("getMySavedTracks", async (arg, thunkAPI) => {
    let tracks = await spotifyWebApi.getMySavedTracks()

    let listId: string[] = tracks.body.items.map(track => track.track.id)

    return {tracks: tracks.body.items, containsMySavedTracks: await getArrContainInMySavedTracks(listId)}
})

export const getMyTopArtists = createAsyncThunk("getMyTopArtists", async (arg, thunkAPI) => {
    let result = await spotifyWebApi.getMyTopArtists()
    return result.body.items
})

export const toggleFromYourSavedTracksRecentlyPlayed = createAsyncThunk
("toggleFromYourSavedTracksRecentlyPlayed", async ({trackId, value, index}: {trackId: string, value: boolean, index: number}, thunkAPI) => {
    if (value) {
        let result = await spotifyWebApi.removeFromMySavedTracks([trackId])
    } else {
        let result = await spotifyWebApi.addToMySavedTracks([trackId])
    }
    return {index: index}
})

export const toggleFromYourSavedTracks = createAsyncThunk
("toggleFromYourSavedTracks", async ({trackId, value, index}: {trackId: string, value: boolean, index: number}, thunkAPI) => {
    if (value) {
        let result = await spotifyWebApi.removeFromMySavedTracks([trackId])
    } else {
        let result = await spotifyWebApi.addToMySavedTracks([trackId])
    }
    return {index: index}
})



export const myLibrarySlice = createSlice({
    name: "myLibrary",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getMyRecentlyPlayedTracks.fulfilled, (state, action) => {
                state.myRecentlyPlayedTracks.tracks = action.payload.tracks
                state.myRecentlyPlayedTracks.containsMySavedTracks = action.payload.containsMySavedTracks
            })
            .addCase(getMySavedTracks.fulfilled, (state, action) => {
                state.mySavedTracks.tracks = action.payload.tracks
                state.mySavedTracks.containsMySavedTracks = action.payload.containsMySavedTracks
            })
            .addCase(getMyTopArtists.fulfilled, (state, action) => {
                state.myTopArtists = action.payload
            })
            .addCase(toggleFromYourSavedTracksRecentlyPlayed.fulfilled, (state, action) => {
                state.myRecentlyPlayedTracks.containsMySavedTracks[action.payload.index] = !state.myRecentlyPlayedTracks.containsMySavedTracks[action.payload.index]
            })
            .addCase(toggleFromYourSavedTracks.fulfilled, (state, action) => {
                state.mySavedTracks.containsMySavedTracks[action.payload.index] = !state.mySavedTracks.containsMySavedTracks[action.payload.index]
            })
    )
})

