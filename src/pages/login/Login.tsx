import React from 'react';
import classes from "./Login.module.scss";
import {auth} from "../../api/api";

const Login: React.FC = () => {

    const loginRedirect = (e: any) => {
        auth.auth()
            .then((res) => {
                window.open(res.headers["x-final-url"])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className={classes.login}>
            <img
                src="https://music-b26f.kxcdn.com/wp-content/uploads/2017/06/635963274692858859903160895_spotify-logo-horizontal-black.jpg"
                alt="Spotify logo"
            />
            <button onClick={loginRedirect}>LOGIN WITH SPOTIFY</button>
        </div>
    );
};

export default Login;
