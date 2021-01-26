import React from 'react';
import classes from "./AlbumHeader.module.scss";
import {Button} from "../button/Button";


type PropsType = {
    album: SpotifyApi.SingleAlbumResponse
}

const AlbumHeader: React.FC<PropsType> = ({album}) => {

    return (
        <header className={classes.banner}
                style={{background: `linear-gradient(#333, #121212)`}}
        >
            <div className={classes.profile}>
                <div className={classes.profileRow}>
                    <img className={classes.mainImage}
                         src={album.images[0].url}
                         alt=""/>
                    <div className={classes.info}>
                        <p className={classes.title}>{album.type}</p>
                        <p className={classes.name}>{album.name}</p>
                        <p className={classes.description}>{album.album_type}</p>
                        <div className={classes.buttons}>
                            <Button btnType={"green"}>Play</Button>
                            <Button>follow</Button>
                        </div>
                    </div>
                </div>
                <div className={classes.followers}>
                    <span className={classes.text}>Followers</span>
                    <span className={classes.text}></span>
                </div>
            </div>
        </header>
    );
};

export default AlbumHeader;
