import React from 'react';
import {Link} from 'react-router-dom';
import classes from "./CurrentTrack.module.scss"
import ArtistsLinks from "../../../common/artistsLinks/ArtistsLinks";

type PropsType = {
    name: string
    artists:  SpotifyApi.ArtistObjectSimplified[]
    thumbnail: string
    albumUrl: string
}

const MyComponent: React.FC<PropsType> = React.memo(({name, artists, thumbnail, albumUrl}) => {
    return (
        <div className={classes.currentTrack}>
            <Link to={{pathname: `/album/${albumUrl}`}}><img className={classes.trackImage} src={thumbnail} alt=""/></Link>
            <div className={classes.trackInfo}>
                <p className={classes.trackName}>{name}</p>
                <p className={classes.trackArtists}>
                    <ArtistsLinks artists={artists} />
                    </p>
            </div>
        </div>

    );
});

export default MyComponent;
