import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";
import {getArrContainInMySavedTracks} from "../helpers/helpers";

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

export const myLibrarySlice = createSlice({
    name: "myLibrary",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getMyRecentlyPlayedTracks.fulfilled, (state, action) => {
                Object.assign(state.myRecentlyPlayedTracks, action.payload)
            })
            .addCase(getMySavedTracks.fulfilled, (state, action) => {
                Object.assign(state.mySavedTracks, action.payload)
            })
            .addCase(getMyTopArtists.fulfilled, (state, action) => {
                state.myTopArtists = action.payload
            })
    )
})

