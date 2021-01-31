import React, {useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {getAlbum, toggleFromYourSavedTracksAlbum} from "../../../store/album-reducer";
import {getTrack, setPlayerQueue} from "../../../store/player-reducer";
import Album from "./Album";

const AlbumContainer = () => {

    let {id} = useParams<{ id: string }>()

    const dispatch = useDispatch()
    const album = useSelector<AppRootStateType, SpotifyApi.SingleAlbumResponse | null>(state => state.album.album)
    const containsMySavedTracks = useSelector<AppRootStateType, boolean[]>(state => state.album.containsMySavedTracks)

    // console.log("album page", album)

    useEffect(() => {
        dispatch(getAlbum({id}))
    }, [id, dispatch])

    const playTrack = useCallback((trackId: string) => {
        dispatch(getTrack({trackId}))
    }, [dispatch])

    const toggleFromYourSavedTracks = useCallback((trackId: string, value: boolean, index: number) => {
        dispatch(toggleFromYourSavedTracksAlbum({trackId, value, index}))
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
                             toggleFromYourSavedTracks={toggleFromYourSavedTracks}
                             setPlayerQueueHandler={setPlayerQueueHandler}
                    />
                    : <div style={{color: "white"}}>Loading</div>
            }
        </>
    );
};

export default AlbumContainer;
