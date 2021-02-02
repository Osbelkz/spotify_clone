import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";
import {getArrContainInMySavedTracks} from "../helpers/helpers";
import {getArtistPopularTracks, setArtistPopularTracks } from "./tracklists-reducer";

const initialState = {
    artist: null as SpotifyApi.SingleArtistResponse | null,
    albums: [] as  SpotifyApi.AlbumObjectSimplified[],
    relatedArtists: [] as  SpotifyApi.ArtistObjectFull[],
    containsMySavedTracks: [] as boolean[]
}

export const getArtist = createAsyncThunk
("getArtist", async ({id}: {id: string}, {dispatch}) => {
    let [artist, albums, relatedArtists] = await Promise
        .all([
            spotifyWebApi.getArtist(id),
            spotifyWebApi.getArtistAlbums(id),
            spotifyWebApi.getArtistRelatedArtists(id)
        ])

    await dispatch(getArtistPopularTracks({id}))

    return {
        artist: artist.body,
        albums: albums.body.items,
        relatedArtists: relatedArtists.body.artists,
    }
})

export const artistSlice = createSlice({
    name: "artist",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getArtist.fulfilled, (state, action) => {
                state.artist = action.payload.artist
                state.albums = action.payload.albums
                state.relatedArtists = action.payload.relatedArtists
            })
    )
})

