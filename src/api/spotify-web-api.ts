// import SpotifyWebApi from "spotify-web-api-js"
//
// export const spotifyWebApi = new SpotifyWebApi();

import SpotifyWebApi from "spotify-web-api-node"

const redirectUri = "http://localhost:3000/";
const {REACT_APP_CLIENT_ID: clientId, REACT_APP_CLIENT_SECRET: client_secret} = process.env;


export const spotifyWebApi = new SpotifyWebApi({
    clientId: clientId,
    clientSecret: client_secret,
    redirectUri: redirectUri
});

