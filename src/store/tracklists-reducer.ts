import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";
import {getArrContainInMySavedTracks} from "../helpers/helpers";

type TracklistNameTypes = "playlist"
    | "mySavedTracks"
    | "myRecentlyPlayedTracks"
    | "album"
    | "artistPopularTracks"

const initialState = {
    myRecentlyPlayedTracks: {
        tracks: [] as SpotifyApi.PlayHistoryObject[],
        containsMySavedTracks: [] as boolean[]
    },
    mySavedTracks: {
        tracks: [] as SpotifyApi.SavedTrackObject[],
        containsMySavedTracks: [] as boolean[]
    },
    artistPopularTracks: {
        tracks: [] as SpotifyApi.TrackObjectFull[],
        containsMySavedTracks: [] as boolean[],
    },
    playlist: {
        body: null as SpotifyApi.SinglePlaylistResponse | null,
        containsMySavedTracks: [] as boolean[]
    },
    album: {
        body: null as SpotifyApi.SingleAlbumResponse | null,
        containsMySavedTracks: [] as boolean[],
    },
    myTopArtists: [] as  SpotifyApi.ArtistObjectFull[]
}

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

export const getPlaylist = createAsyncThunk
("getPlaylist", async ({id}: { id: string }, thunkAPI) => {

    let playlist = await spotifyWebApi.getPlaylist(id)

    let listId: string[] = playlist.body.tracks.items.map(track => track.track.id)

    return {playlist: playlist.body, containsMySavedTracks: await getArrContainInMySavedTracks(listId)}
})

export const getAlbum = createAsyncThunk
("getAlbum", async ({id}: {id: string}, thunkAPI) => {
    let result = await spotifyWebApi.getAlbum(id)

    let listId = result.body.tracks.items.map(track => track.id)

    return {album: result.body, containsMySavedTracks: await getArrContainInMySavedTracks(listId)}
})

export const getArtistPopularTracks = createAsyncThunk
("getArtistPopularTracks", async ({id}: {id: string}, thunkAPI) => {

    let result = await spotifyWebApi.getArtistTopTracks(id, "RU")

    let listId = result.body.tracks.map(track => track.id)

    return {tracks: result.body.tracks, containsMySavedTracks: await getArrContainInMySavedTracks(listId)}
})

type ToggleFromYourSavedTracksPayloadType = {
    trackId: string
    value: boolean
    index: number
    tracklistName: TracklistNameTypes
}

export const toggleFromYourSavedTracks = createAsyncThunk
("toggleFromYourSavedTracks", async ({trackId, value, index, tracklistName}: ToggleFromYourSavedTracksPayloadType, thunkAPI) => {
    if (value) {
        await spotifyWebApi.removeFromMySavedTracks([trackId])
    } else {
        await spotifyWebApi.addToMySavedTracks([trackId])
    }
    return {index: index, tracklistName: tracklistName}
})



export const tracklistsSlice = createSlice({
    name: "tracklists",
    initialState: initialState,
    reducers: {
        setArtistPopularTracks: (state, action: PayloadAction<{tracks: SpotifyApi.TrackObjectFull[], containsMySavedTracks: boolean[]}>) => {
            debugger
            state.artistPopularTracks.tracks = action.payload.tracks
            state.artistPopularTracks.containsMySavedTracks = action.payload.containsMySavedTracks
        }
    },

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
            .addCase(getPlaylist.fulfilled, (state, action) => {
                state.playlist.body = action.payload.playlist
                state.playlist.containsMySavedTracks = action.payload.containsMySavedTracks
            })
            .addCase(getAlbum.fulfilled, (state, action) => {
                state.album.body = action.payload.album
                state.album.containsMySavedTracks = action.payload.containsMySavedTracks
            })
            .addCase(getArtistPopularTracks.fulfilled, (state, action) => {
                state.artistPopularTracks.tracks = action.payload.tracks
                state.artistPopularTracks.containsMySavedTracks = action.payload.containsMySavedTracks
            })
            .addCase(toggleFromYourSavedTracks.fulfilled, (state, action) => {
                const {index, tracklistName} = action.payload
                state[tracklistName].containsMySavedTracks[index] = !state[tracklistName].containsMySavedTracks[index]
            })
    )
})

export const {setArtistPopularTracks} = tracklistsSlice.actions
