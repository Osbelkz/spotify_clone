import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from "./CurrentTrack.module.scss"

type PropsType = {
    name: string
    artists:  SpotifyApi.ArtistObjectSimplified[]
    thumbnail: string
    albumUrl: string
}

const MyComponent: React.FC<PropsType> = ({name, artists, thumbnail, albumUrl}) => {

    const history = useHistory()

    const openAlbum = () => {
        history.push(`album/${albumUrl}`)
    }

    return (
        <div className={classes.currentTrack}>
            <div onClick={openAlbum}><img className={classes.trackImage} src={thumbnail} alt=""/></div>
            <div className={classes.trackInfo}>
                <p className={classes.trackName}>{name}</p>
                <p className={classes.trackArtists}>{artists.map(artist => artist.name).join(", ")}</p>
            </div>
        </div>

    );
};

export default MyComponent;
