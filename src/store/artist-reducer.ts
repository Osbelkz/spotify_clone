import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";
import {getArrContainInMySavedTracks} from "../helpers/helpers";

const initialState = {
    artist: null as SpotifyApi.SingleArtistResponse | null,
    popularTracks: [] as SpotifyApi.TrackObjectFull[],
    albums: [] as  SpotifyApi.AlbumObjectSimplified[],
    relatedArtists: [] as  SpotifyApi.ArtistObjectFull[],
    containsMySavedTracks: [] as boolean[]
}

export const getArtist = createAsyncThunk
("getArtist", async ({id}: {id: string}, thunkAPI) => {
    let [artist, popular, albums, relatedArtists] = await Promise
        .all([
            spotifyWebApi.getArtist(id),
            spotifyWebApi.getArtistTopTracks(id, "RU"),
            spotifyWebApi.getArtistAlbums(id),
            spotifyWebApi.getArtistRelatedArtists(id)
        ])

    let listId: string[] = popular.body.tracks.map(track => track.id)

    return {
        artist: artist.body,
        popularTracks: popular.body.tracks,
        albums: albums.body.items,
        relatedArtists: relatedArtists.body.artists,
        containsMySavedTracks: await getArrContainInMySavedTracks(listId)
    }
})

export const artistSlice = createSlice({
    name: "artist",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getArtist.fulfilled, (state, action) => {
                Object.assign(state, action.payload)
            })
    )
})

