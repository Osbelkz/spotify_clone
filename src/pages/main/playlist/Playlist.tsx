import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {getPlaylist} from "../../../store/playlist-reducer";
import Tracklist from "../../../components/common/tracklist/Tracklist";

const Playlist = () => {

    let {id} = useParams<{id: string}>()

    const dispatch = useDispatch()
    const playlist = useSelector<AppRootStateType, SpotifyApi.SinglePlaylistResponse | null>(state => state.playlist.playlist)

    console.log("playlist page", playlist)

    useEffect(() => {
        dispatch(getPlaylist({id}))
    }, [id])

    return (
        <div>

            <div>
                {playlist?.name}
            </div>
            {playlist && <Tracklist tracks={playlist?.tracks.items as SpotifyApi.SavedTrackObject[]}/>}

        </div>
    );
};

export default Playlist;
