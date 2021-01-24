import React, {useState} from 'react';

import classes from './Artist.module.scss';
import Skeleton from "react-loading-skeleton";
import PopularTracks from "../../../components/artist/PopularTracks";
import Cards from "../../../components/common/cards/Cards";

type PropsType = {
    artist: SpotifyApi.SingleArtistResponse
    popularTracks: SpotifyApi.TrackObjectFull[]
    albums: SpotifyApi.AlbumObjectSimplified[]
    relatedArtists: SpotifyApi.ArtistObjectFull[]
}

const Artist: React.FC<PropsType> = ({artist, albums, popularTracks, relatedArtists}) => {

    const [artistImageLoadComplete, setArtistImageLoadComplete] = useState(false)

    return (
        <div className={classes.artist}>
            <header className={classes.banner}>
                <div className={classes.profile}>
                    <div className={classes.profileRow}>
                        <img className={classes.mainImage}
                             src={artist.images[1].url}
                             style={{display: artistImageLoadComplete ? "block" : "none"}}
                             onLoad={() => setArtistImageLoadComplete(true)}
                             alt=""/>
                        {!artistImageLoadComplete && <Skeleton
                            circle={true}
                            width={"13.2rem"}
                            height={"13.2rem"}/>}
                        <div className={classes.info}>
                            <p className={classes.title}>Artist</p>
                            <p className={classes.name}>{artist.name}</p>
                            <div className={classes.buttons}>
                                <button>Play</button>
                                <button>following</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.followers}>
                        <span className={classes.text}>Followers</span>
                        <span className={classes.text}>{artist.followers.total}</span>
                    </div>
                </div>

                <div className={classes.nav}></div>
            </header>
            <PopularTracks tracks={popularTracks} />
            <div>
                <Cards cards={albums} type={"album"}/>
            </div>
        </div>
    );
};

export default Artist;
