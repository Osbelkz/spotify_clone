import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import { spotifyWebApi } from "../api/spotify-web-api";

const initialState = {
    displayName: "" as string | undefined,
    MyRecentlyPlayedTracks: [] as Array<SpotifyApi.PlayHistoryObject>,
}

export type HomeStateType = typeof initialState

export const getMyInfo = createAsyncThunk<HomeStateType, undefined>("getMyInfo", async (arg, thunkAPI) => {
    const result = {} as HomeStateType
    await spotifyWebApi.getMe({}).then((data) => {
        result.displayName = data.display_name
    })
    await spotifyWebApi.getMyRecentlyPlayedTracks().then((data) => {
        result.MyRecentlyPlayedTracks = data.items
    })
    return result
})

export const homeSlice = createSlice({
    name: "home",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getMyInfo.fulfilled, (state, action) => {
                state.displayName = action.payload.displayName
                state.MyRecentlyPlayedTracks = action.payload.MyRecentlyPlayedTracks
            })
    )
})

