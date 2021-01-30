import React from 'react';
import {Link} from "react-router-dom";
import classes from "./ArtistsLinks.module.scss";


type PropsType = {
    artists: SpotifyApi.ArtistObjectSimplified[]
}


const ArtistsLinks: React.FC<PropsType> = React.memo(({artists}) => {
    return (
        <>
            {artists.map((artist, index, arr) => (
                <Link key={artist.id} className={classes.artistName}
                      to={{pathname: `/artist/${artist.id}`}}>{index !== arr.length - 1 ? artist.name + ", " : artist.name}
                </Link>
            ))}
        </>
    );
});

export default ArtistsLinks;
