import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { spotifyWebApi } from "../api/spotify-web-api";

const initialState = {
    isLoggedIn: false,
    token: {
        access_token: "",
        expires_in: "",
        token_type: ""
    } as tokenDataType
}

export const setAccessToken = createAsyncThunk<tokenDataType, tokenDataType>("setAccessToken", (tokenData, thunkAPI) => {
    spotifyWebApi.setAccessToken(tokenData.access_token)
    return tokenData
})

export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(setAccessToken.fulfilled, (state, action) => {
                state.token = action.payload
                state.isLoggedIn = true
            })
    )
})

export type tokenDataType = {
    access_token: string,
    expires_in: string,
    token_type: string
}

