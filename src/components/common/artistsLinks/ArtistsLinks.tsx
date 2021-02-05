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
                <React.Fragment key={artist.id}>
                    <Link className={classes.artistName}
                          to={{pathname: `/artist/${artist.id}`}}>{artist.name}
                    </Link>
                    {index !== arr.length - 1 ? ", ": ""}
                </React.Fragment>
            ))}
        </>
    );
});

export default ArtistsLinks;
