import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from "./PlaylistCard.module.scss";

type PropsType = {
    playlist: SpotifyApi.PlaylistObjectSimplified | SpotifyApi.AlbumObjectSimplified
}

const PlaylistCard: React.FC<PropsType> = ({playlist}) => {

    const history = useHistory()

    const chooseAlbum = () => {
        if (playlist.type === "album") {
            history.push(`album/${playlist.id}`)
        } else {
            history.push(`playlist/${playlist.id}`)

        }
    }

    return (
        <div className={classes.playlistCard}>
            <div onClick={chooseAlbum}>
                <img className={classes.hover} src={playlist.images[0].url} alt=""/>
            </div>

            <p className={classes.name}>{playlist.name}</p>
            <p className={classes.description}>{playlist.type !== "album" ? playlist.description : playlist.name}</p>
        </div>
    );
};

export default PlaylistCard;
