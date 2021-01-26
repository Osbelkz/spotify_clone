import React from 'react';
import classes from "./PlaylistHeader.module.scss";
import {Button} from "../button/Button";


type PropsType = {
    playlist: SpotifyApi.SinglePlaylistResponse
}

const PlaylistHeader: React.FC<PropsType> = ({playlist}) => {

    // @ts-ignore
    const gradientColor = playlist.primary_color

    return (
        <header className={classes.banner}
                style={{background: `linear-gradient(${gradientColor ?? `#333`}, #121212)`}}
        >
            <div className={classes.profile}>
                <div className={classes.profileRow}>
                    <img className={classes.mainImage}
                         src={playlist.images[0].url}
                         alt=""/>
                    <div className={classes.info}>
                        <p className={classes.title}>{playlist.type}</p>
                        <p className={classes.name}>{playlist.name}</p>
                        <p className={classes.description}>{playlist.description}</p>
                        <div className={classes.buttons}>
                            <Button btnType={"green"}>Play</Button>
                            <Button>follow</Button>
                        </div>
                    </div>
                </div>
                <div className={classes.followers}>
                    <span className={classes.text}>Followers</span>
                    <span className={classes.text}>{playlist.followers.total}</span>
                </div>
            </div>
        </header>
    );
};

export default PlaylistHeader;
