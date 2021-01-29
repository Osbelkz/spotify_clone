import React from 'react';
import classes from './Artist.module.scss';
import PopularTracks from "../../../components/artist/popularTracks/PopularTracks";
import Cards from "../../../components/common/cards/Cards";
import {Button} from "../../../components/common/button/Button";
import Image from "../../../components/common/image/Image";

type PropsType = {
    artist: SpotifyApi.SingleArtistResponse
    popularTracks: SpotifyApi.TrackObjectFull[]
    albums: SpotifyApi.AlbumObjectSimplified[]
    relatedArtists: SpotifyApi.ArtistObjectFull[]
    containsMySavedTracks: boolean[]
}

const Artist: React.FC<PropsType> = ({artist, albums, popularTracks, containsMySavedTracks, relatedArtists}) => {


    return (
        <div className={classes.artist}>
            <header className={classes.banner}>
                <div className={classes.profile}>
                    <div className={classes.profileRow}>
                        <Image className={classes.mainImage}
                               src={artist.images[1].url}
                               alt={""}/>
                        <div className={classes.info}>
                            <p className={classes.title}>Artist</p>
                            <h1 className={classes.name}>{artist.name}</h1>
                            <div className={classes.buttons}>
                                <Button btnType={"green"}>Play</Button>
                                <Button>follow</Button>
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
            <div className={classes.content}>
                <PopularTracks tracks={popularTracks} containsMySavedTracks={containsMySavedTracks}/>
                <div className={classes.artistAlbumsWrapper}>
                    <h3 className={classes.title}>Albums</h3>
                    <Cards cards={albums} type={"album"}/>
                </div>
            </div>

        </div>
    );
};

export default Artist;
