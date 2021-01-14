import React from 'react';
import {Link} from 'react-router-dom';
import classes from "./PlaylistCard.module.scss";

type PropsType = {
    playlist: SpotifyApi.PlaylistObjectSimplified | SpotifyApi.AlbumObjectSimplified
}

const PlaylistCard: React.FC<PropsType> = ({playlist}) => {


    return (
        <div className={classes.playlistCard}>
            <div>
                <Link to={{pathname: playlist.type === "album" ? `/album/${playlist.id}` : `playlist/${playlist.id}`}}>
                    <img className={classes.hover} src={playlist.images[0].url} alt=""/>
                </Link>
            </div>

            <p className={classes.name}>{playlist.name}</p>
            <p className={classes.description}>{playlist.type !== "album" ? playlist.description : playlist.name}</p>
        </div>
    );
};

export default PlaylistCard;
