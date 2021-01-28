import React from 'react';
import Tracklist from "../../../components/common/tracklist/Tracklist";
import classes from "./Playlist.module.scss"
import TracklistHeader from "../../../components/tracklistHeader/TracklistHeader";

type PropsType = {
    playlist: SpotifyApi.SinglePlaylistResponse
}

const Playlist: React.FC<PropsType> = ({playlist}) => {

    return (
        <div className={classes.playlist}>
            <TracklistHeader imageUrl={playlist.images[0].url}
                             name={playlist.name}
                             followers={playlist.followers.total}
                             type={playlist.type}>
                {playlist.description}
            </TracklistHeader>
            <Tracklist tracks={playlist.tracks.items as SpotifyApi.SavedTrackObject[]}/>

        </div>
    );
};

export default Playlist;
