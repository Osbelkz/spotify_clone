import axios from "axios";
import {tokenDataType} from "../store/app-reducer";
export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const {REACT_APP_CLIENT_ID: clientId, REACT_APP_CLIENT_SECRET: client_secret} = process.env;

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
)}&response_type=token&show_dialog=true`;

export const auth = {
    auth () {
        return axios.get("https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize", {
            params: {
                client_id: clientId,
                response_type: "token",
                redirect_uri: redirectUri,
                scope: scopes.join("%20"),
                show_dialog: true
            }
        })
    },
    exchangeToken (tokenData: tokenDataType) {
        return axios.post("https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/api/token", {
            grant_type: "authorization_code",
            access_token: tokenData.access_token,
            token_type: tokenData.token_type,
            client_id: clientId,
            client_secret: client_secret,
        })
    }
}
