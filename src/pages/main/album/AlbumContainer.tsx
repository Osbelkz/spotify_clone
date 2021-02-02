import React, {useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {getTrack, setPlayerQueue} from "../../../store/player-reducer";
import Album from "./Album";
import { getAlbum, toggleFromYourSavedTracks } from '../../../store/tracklists-reducer';

const AlbumContainer = () => {

    let {id} = useParams<{ id: string }>()

    const dispatch = useDispatch()
    const album = useSelector<AppRootStateType, SpotifyApi.SingleAlbumResponse | null>(state => state.tracklists.album.body)
    const containsMySavedTracks = useSelector<AppRootStateType, boolean[]>(state => state.tracklists.album.containsMySavedTracks)

    // console.log("album page", album)

    useEffect(() => {
        dispatch(getAlbum({id}))
    }, [id, dispatch])

    const playTrack = useCallback((trackId: string) => {
        dispatch(getTrack({trackId}))
    }, [dispatch])

    const toggleFromYourSavedTracksHandler = useCallback((trackId: string, value: boolean, index: number) => {
        dispatch(toggleFromYourSavedTracks({trackId, value, index, tracklistName: "album"}))
    }, [dispatch])

    const setPlayerQueueHandler = useCallback(() => {
        if (album) {
            const queue = album.tracks.items.map(track => track.id)
            dispatch(setPlayerQueue(queue))
        }
    }, [dispatch, album])


    return (
        <>
            {
                (id === album?.id)
                    ? <Album album={album}
                             containsMySavedTracks={containsMySavedTracks}
                             playTrack={playTrack}
                             toggleFromYourSavedTracks={toggleFromYourSavedTracksHandler}
                             setPlayerQueueHandler={setPlayerQueueHandler}
                    />
                    : <div style={{color: "white"}}>Loading</div>
            }
        </>
    );
};

export default AlbumContainer;
