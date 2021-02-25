import React, {useCallback, useEffect} from 'react';
import Playlist from "./Playlist";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import { getPlaylist, toggleFromYourSavedTracks } from '../../../store/tracklists-reducer';
import Preloader from "../../../components/common/preloader/Preloader";

const PlaylistContainer = () => {

    let {id} = useParams<{ id: string }>()

    const dispatch = useDispatch()
    const playlist = useSelector<AppRootStateType, SpotifyApi.SinglePlaylistResponse | null>(state => state.tracklists.playlist.body)
    const containsMySavedTracks = useSelector<AppRootStateType, boolean[]>(state => state.tracklists.playlist.containsMySavedTracks)

    console.log("playlist page", playlist)

    useEffect(() => {
        dispatch(getPlaylist({id}))
    }, [id, dispatch])


    const toggleFromYourSavedTracksHandler = useCallback((trackId: string, value: boolean, index: number) => {
        dispatch(toggleFromYourSavedTracks({trackId, value, index, tracklistName: "playlist"}))
    }, [dispatch])


    return (
        <>
            {
                (id === playlist?.id)
                    ? <Playlist playlist={playlist}
                                toggleFromYourSavedTracks={toggleFromYourSavedTracksHandler}
                                containsMySavedTracks={containsMySavedTracks}
                    />
                    : <Preloader />
            }
        </>
    );
};

export default PlaylistContainer;
