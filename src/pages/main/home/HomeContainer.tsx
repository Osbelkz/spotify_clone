import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {getFeaturedPlaylists, getNewReleases} from "../../../store/home-reducer";
import Home from "./Home";

const HomeContainer = () => {

    const dispatch = useDispatch()
    const featuredPlaylists = useSelector<AppRootStateType, SpotifyApi.PlaylistObjectSimplified[]>(state => state.home.featuredPlaylists)
    const newReleases = useSelector<AppRootStateType, SpotifyApi.AlbumObjectSimplified[]>(state => state.home.newReleases)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.home.isLoading)

    useEffect(() => {
        if (!featuredPlaylists.length || !newReleases.length) {
            dispatch(getFeaturedPlaylists())
            dispatch(getNewReleases())
        }
    }, [])



    return (
            <Home featuredPlaylists={featuredPlaylists}
                  newReleases={newReleases}
                  isLoading={isLoading} />
    );
};

export default HomeContainer;
