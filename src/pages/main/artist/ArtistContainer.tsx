import React, {useEffect} from 'react';
import Artist from "./Artist";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {AppRootStateType} from "../../../store/store";
import {getArtist} from "../../../store/artist-reducer";

const ArtistContainer = () => {

    const dispatch = useDispatch()
    let {id} = useParams<{ id: string }>()

    const artist = useSelector<AppRootStateType, SpotifyApi.SingleArtistResponse | null>(state => state.artist.artist)
    const popularTracks = useSelector<AppRootStateType, SpotifyApi.TrackObjectFull[]>(state => state.artist.popularTracks)
    const albums = useSelector<AppRootStateType, SpotifyApi.AlbumObjectSimplified[]>(state => state.artist.albums)
    const relatedArtists = useSelector<AppRootStateType, SpotifyApi.ArtistObjectFull[]>(state => state.artist.relatedArtists)

    console.log("artist", artist)
    console.log("artist popular tracks ", popularTracks)
    console.log("artist albums ", albums)
    console.log("artist related artists ", relatedArtists)

    useEffect(() => {
        dispatch(getArtist({id}))
    }, [id])


    return (
        <>
            {
                (id !== artist?.id)
                    ? <div style={{color: "white"}}>Loading</div>
                    : <Artist artist={artist}
                              popularTracks={popularTracks}
                              albums={albums}
                              relatedArtists={relatedArtists}/>
            }
        </>
    );
};

export default ArtistContainer;
