import axios from "axios";
import {tokenDataType} from "../store/app-reducer";
export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const {REACT_APP_CLIENT_ID: clientId} = process.env;

const scopes = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-library-read",
    "user-library-modify",
];


export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=code&show_dialog=true`;

export const auth = {
    exchangeCode (code: string) {
        return axios.post<tokenDataType>("https://spotify-token-ex.herokuapp.com/exchange", {code})
    },
    refreshToken (refresh_token: string) {
        return axios.post("https://spotify-token-ex.herokuapp.com/exchange", {refresh_token})
    }

}
