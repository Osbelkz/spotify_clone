import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    currentTrack: undefined as SpotifyApi.TrackObjectFull | undefined
}

// export const getMyInfo = createAsyncThunk
// ("getMyInfo", async (arg, thunkAPI) => {
//     let result = await spotifyWebApi.getMe()
//     console.log(result)
//     return result.display_name
// })

export const playerSlice = createSlice({
    name: "player",
    initialState: initialState,
    reducers: {
        setTrack: (state, action: PayloadAction<SpotifyApi.TrackObjectSimplified>) => {
            state.currentTrack = action.payload as SpotifyApi.TrackObjectFull
        }
    },

})

export const {setTrack} = playerSlice.actions

