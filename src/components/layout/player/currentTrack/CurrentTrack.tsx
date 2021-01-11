import React from 'react';
import classes from "./CurrentTrack.module.scss"

type PropsType = {
    name: string
    artists:  SpotifyApi.ArtistObjectSimplified[]
    thumbnail: string
    albumUrl: string
}

const MyComponent: React.FC<PropsType> = ({name, artists, thumbnail, albumUrl}) => {
    return (
        <div className={classes.currentTrack}>
            <a href={albumUrl}><img className={classes.trackImage} src={thumbnail} alt=""/></a>
            <div className={classes.trackInfo}>
                <p className={classes.trackName}>{name}</p>
                <p className={classes.trackArtists}>{artists.map(artist => artist.name).join(", ")}</p>
            </div>
        </div>

    );
};

export default MyComponent;
