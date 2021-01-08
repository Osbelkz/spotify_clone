import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { spotifyWebApi } from "../api/spotify-web-api";

const initialState = {

}

export const getMyInfo = createAsyncThunk<unknown, undefined>("getMyInfo", async (arg, thunkAPI) => {
    let result = await spotifyWebApi.getMe({}).then((data) => {
        console.log(data)
    })

})

export const homeSlice = createSlice({
    name: "home",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getMyInfo.fulfilled, (state, action) => {
            })
    )
})

