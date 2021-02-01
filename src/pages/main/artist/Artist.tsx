import React, {useCallback} from 'react';
import classes from './Artist.module.scss';
import PopularTracks from "../../../components/artist/popularTracks/PopularTracks";
import {Button} from "../../../components/common/button/Button";
import Image from "../../../components/common/image/Image";
import AlbumCards from "../../../components/common/cards/AlbumCards";
import {prettifyNumber} from '../../../helpers/helpers';
import TracklistHeader from "../../../components/common/tracklist/TracklistHeader";

type PropsType = {
    artist: SpotifyApi.SingleArtistResponse
    popularTracks: SpotifyApi.TrackObjectFull[]
    albums: SpotifyApi.AlbumObjectSimplified[]
    relatedArtists: SpotifyApi.ArtistObjectFull[]
    containsMySavedTracks: boolean[]
}

const Artist: React.FC<PropsType> = ({artist, albums, popularTracks, containsMySavedTracks, relatedArtists}) => {


    const setPlayerQueue = useCallback(() => {

    }, [])

    return (
        <div className={classes.artist}>
            <TracklistHeader imageUrl={artist.images[1].url}
                             name={artist.name}
                             type={artist.type}
                             followers={artist.followers.total}
                             setPlayerQueueHandler={setPlayerQueue}>

            </TracklistHeader>
            <div className={classes.nav}></div>
            <div className={classes.content}>
                <PopularTracks tracks={popularTracks} containsMySavedTracks={containsMySavedTracks}/>
                <div className={classes.artistAlbumsWrapper}>
                    <h3 className={classes.title}>Albums</h3>
                    <AlbumCards cards={albums}/>
                </div>
            </div>

        </div>
    );
};

export default Artist;
