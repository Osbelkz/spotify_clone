import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { spotifyWebApi } from "../api/spotify-web-api";

const initialState = {
    isLoggedIn: false,
}

export const setAccessToken = createAsyncThunk<unknown, tokenDataType>("setAccessToken", (tokenData, thunkAPI) => {
    spotifyWebApi.setAccessToken(tokenData.access_token)

})

export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(setAccessToken.fulfilled, (state, action) => {
                state.isLoggedIn = true
            })
    )
})

export type tokenDataType = {
    access_token: string,
    expires_in: string,
    token_type: string
}

