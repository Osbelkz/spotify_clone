import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {spotifyWebApi} from "../api/spotify-web-api";
import {auth} from "../api/api";

const initialState = {
    isLoggedIn: false,
    token: {
        access_token: "",
        expires_in: "",
        refresh_token: ""
    } as tokenDataType
}

export const getAuthData = createAsyncThunk<tokenDataType, string, { rejectValue: undefined }>("getAuthData",
      async (code, {rejectWithValue}) => {
        try {
            let res = await auth.exchangeCode(code)
            const {data: {access_token, expires_in, refresh_token}} = res
            spotifyWebApi.setAccessToken(access_token)
            spotifyWebApi.setRefreshToken(refresh_token)
            return {access_token, expires_in, refresh_token}
        } catch (e) {
            console.log(e)
            return rejectWithValue(undefined)
        }


        // spotifyWebApi.authorizationCodeGrant(authorizationCode).then(
        //     function(data) {
        //         // Set the access token and refresh token
        //         spotifyApi.setAccessToken(data.body['access_token']);
        //         spotifyApi.setRefreshToken(data.body['refresh_token']);
        //
        //         // Save the amount of seconds until the access token expired
        //         tokenExpirationEpoch =
        //             new Date().getTime() / 1000 + data.body['expires_in'];
        //         console.log(
        //             'Retrieved token. It expires in ' +
        //             Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
        //             ' seconds!'
        //         );
        //     },
        //     function(err) {
        //         console.log(
        //             'Something went wrong when retrieving the access token!',
        //             err.message
        //         );
        //     }
        // );
    })

export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => (
        builder
            .addCase(getAuthData.fulfilled, (state, action) => {
                state.token = action.payload
                state.isLoggedIn = true
            })
    )
})

export type tokenDataType = {
    access_token: string,
    expires_in: string,
    refresh_token: string
}

