import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";

const initialState = {
    categories: [] as  SpotifyApi.CategoryObject[],
    playlists: [] as SpotifyApi.PlaylistObjectSimplified[]
}

export const getCategories = createAsyncThunk
("getCategories", async () => {
    let result = await spotifyWebApi.getCategories({country: "US", limit: 50})
    console.log(result)
    return result.body.categories.items
})

export const getPlaylistsForCategory = createAsyncThunk<SpotifyApi.PlaylistObjectSimplified[],{categoryId: string}>
("getPlaylistsForCategory", async ({categoryId}) => {
    let result = await spotifyWebApi.getPlaylistsForCategory(categoryId)
    console.log(result)
    return result.body.playlists.items
})


export const browseSlice = createSlice({
    name: "browse",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categories = action.payload
            })
            .addCase(getPlaylistsForCategory.fulfilled, (state, action) => {
                state.playlists = action.payload
            })
    )

})
