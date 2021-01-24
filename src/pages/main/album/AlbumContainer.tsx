import React, {useCallback, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {getAlbum} from "../../../store/album-reducer";
import {getTrack} from "../../../store/player-reducer";
import Album from "./Album";

const AlbumContainer = () => {

    let {id} = useParams<{ id: string }>()

    const dispatch = useDispatch()
    const album = useSelector<AppRootStateType, SpotifyApi.SingleAlbumResponse | null>(state => state.album.album)

    console.log("album page", album)

    useEffect(() => {
        dispatch(getAlbum({id}))
    }, [id])

    const playTrack = useCallback((trackId: string) => {
        dispatch(getTrack({trackId}))
    }, [])


    return (
        <>
            {
                (id === album?.id)
                    ? <Album album={album} playTrack={playTrack}/>
                    : <div style={{color: "white"}}>Loading</div>
            }
        </>
    );
};

export default AlbumContainer;
