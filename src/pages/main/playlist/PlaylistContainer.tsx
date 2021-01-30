import React, {useCallback, useEffect} from 'react';
import Playlist from "./Playlist";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {getPlaylist, toggleFromYourSavedTracksPlaylist} from "../../../store/playlist-reducer";

const PlaylistContainer = () => {

    let {id} = useParams<{ id: string }>()

    const dispatch = useDispatch()
    const playlist = useSelector<AppRootStateType, SpotifyApi.SinglePlaylistResponse | null>(state => state.playlist.playlist)
    const containsMySavedTracks = useSelector<AppRootStateType, boolean[]>(state => state.playlist.containsMySavedTracks)

    console.log("playlist page", playlist)

    useEffect(() => {
        dispatch(getPlaylist({id}))
    }, [id])


    const toggleFromYourSavedTracks = useCallback((trackId: string, value: boolean, index: number) => {
        dispatch(toggleFromYourSavedTracksPlaylist({trackId, value, index}))
    }, [dispatch])


    return (
        <>
            {
                (id === playlist?.id)
                    ? <Playlist playlist={playlist}
                                toggleFromYourSavedTracks={toggleFromYourSavedTracks}
                                containsMySavedTracks={containsMySavedTracks}
                    />
                    : <div style={{color: "white"}}>Loading</div>
            }
        </>
    );
};

export default PlaylistContainer;
