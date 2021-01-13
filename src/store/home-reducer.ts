import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";

const initialState = {
    displayName: "" as string | undefined,

    featuredPlaylists: [] as SpotifyApi.PlaylistObjectSimplified[],
    newReleases: [] as  SpotifyApi.AlbumObjectSimplified[],

}

export type HomeStateType = typeof initialState

export const getMyInfo = createAsyncThunk
("getMyInfo", async (arg, thunkAPI) => {
    let result = await spotifyWebApi.getMe()
    return result.display_name
})

export const getFeaturedPlaylists = createAsyncThunk
("getFeaturedPlaylists", async (arg, thunkAPI) => {
    let result = await spotifyWebApi.getFeaturedPlaylists()
    console.log("featuredPlaylists",result)
    return result.playlists.items
})

export const getNewReleases = createAsyncThunk
("getNewReleases", async (arg, thunkAPI) => {
    let result = await spotifyWebApi.getNewReleases()
    console.log("newReleases",result)
    return result.albums.items
})

export const homeSlice = createSlice({
    name: "home",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getMyInfo.fulfilled, (state, action) => {
                state.displayName = action.payload
            })
            .addCase(getFeaturedPlaylists.fulfilled, (state, action) => {
                state.featuredPlaylists = action.payload
            })
            .addCase(getNewReleases.fulfilled, (state, action) => {
                state.newReleases = action.payload
            })
    )
})

