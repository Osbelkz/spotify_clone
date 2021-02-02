import React, {useEffect} from 'react';
import Artist from "./Artist";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {AppRootStateType} from "../../../store/store";
import {getArtist} from "../../../store/artist-reducer";
import {getArrContainInMySavedTracks} from "../../../helpers/helpers";

const ArtistContainer = () => {

    const dispatch = useDispatch()
    let {id} = useParams<{ id: string }>()

    const artist = useSelector<AppRootStateType, SpotifyApi.SingleArtistResponse | null>(state => state.artist.artist)
    const albums = useSelector<AppRootStateType, SpotifyApi.AlbumObjectSimplified[]>(state => state.artist.albums)
    const relatedArtists = useSelector<AppRootStateType, SpotifyApi.ArtistObjectFull[]>(state => state.artist.relatedArtists)
    const containsMySavedTracks = useSelector<AppRootStateType, boolean[]>(state => state.tracklists.artistPopularTracks.containsMySavedTracks)
    const popularTracks = useSelector<AppRootStateType, SpotifyApi.TrackObjectFull[]>(state => state.tracklists.artistPopularTracks.tracks)

    console.log("artist related artists ", containsMySavedTracks, popularTracks)

    useEffect(() => {
        dispatch(getArtist({id}))
    }, [id, dispatch])


    return (
        <>
            {
                (id !== artist?.id)
                    ? <div style={{color: "white"}}>Loading</div>
                    : <Artist artist={artist}
                              popularTracks={popularTracks}
                              albums={albums}
                              containsMySavedTracks={containsMySavedTracks}
                              relatedArtists={relatedArtists}/>
            }
        </>
    );
};

export default ArtistContainer;
