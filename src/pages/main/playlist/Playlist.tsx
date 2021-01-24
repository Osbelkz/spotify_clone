import React from 'react';
import Tracklist from "../../../components/common/tracklist/Tracklist";

type PropsType = {
    playlist: SpotifyApi.SinglePlaylistResponse
}

const Playlist: React.FC<PropsType> = ({playlist}) => {


    return (
        <div>
            <div>
                {playlist?.name}
            </div>
            <Tracklist tracks={playlist?.tracks.items as SpotifyApi.SavedTrackObject[]}/>

        </div>
    );
};

export default Playlist;
