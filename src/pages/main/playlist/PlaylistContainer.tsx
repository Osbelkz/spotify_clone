import React, {useEffect} from 'react';
import Album from "../album/Album";
import Playlist from "./Playlist";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {getPlaylist} from "../../../store/playlist-reducer";

const PlaylistContainer = () => {

    let {id} = useParams<{ id: string }>()

    const dispatch = useDispatch()
    const playlist = useSelector<AppRootStateType, SpotifyApi.SinglePlaylistResponse | null>(state => state.playlist.playlist)
    const containsMySavedTracks = useSelector<AppRootStateType, boolean[]>(state => state.playlist.containsMySavedTracks)

    console.log("playlist page", playlist)

    useEffect(() => {
        dispatch(getPlaylist({id}))
    }, [id])


    return (
        <>
            {
                (id === playlist?.id)
                    ? <Playlist playlist={playlist}
                                containsMySavedTracks={containsMySavedTracks}
                    />
                    : <div style={{color: "white"}}>Loading</div>
            }
        </>
    );
};

export default PlaylistContainer;
