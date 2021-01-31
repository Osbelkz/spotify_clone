import React from 'react';
import Tracklist from "../../../components/common/tracklist/Tracklist";
import classes from "./Playlist.module.scss"
import TracklistHeader from "../../../components/common/tracklist/TracklistHeader";

type PropsType = {
    playlist: SpotifyApi.SinglePlaylistResponse
    containsMySavedTracks: boolean[]
    toggleFromYourSavedTracks: (trackId: string, value: boolean, index: number) => void
}

const Playlist: React.FC<PropsType> = ({playlist, containsMySavedTracks, toggleFromYourSavedTracks}) => {

    return (
        <div className={classes.playlist}>
            <TracklistHeader imageUrl={playlist.images[0].url}
                             name={playlist.name}
                             followers={playlist.followers.total}
                             setPlayerQueueHandler={()=>{}}
                             type={playlist.type}>
                {playlist.description}
            </TracklistHeader>
            <Tracklist
                tracks={playlist.tracks.items as SpotifyApi.SavedTrackObject[]}
                containsMySavedTracks={containsMySavedTracks}
                toggleFromYourSavedTracks={toggleFromYourSavedTracks}
            />

        </div>
    );
};

export default Playlist;
