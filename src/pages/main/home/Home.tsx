import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getFeaturedPlaylists, getNewReleases} from "../../../store/home-reducer";
import {AppRootStateType} from "../../../store/store";
import PlaylistCard from "../../../components/common/playlistCard/PlaylistCard";
import classes from './Home.module.scss';
import {SkeletonTheme} from "react-loading-skeleton";
import PlaylistCardSkeleton from "../../../components/common/playlistCard/PlaylistCardSkeleton";

const Home = () => {

    const dispatch = useDispatch()
    const featuredPlaylists = useSelector<AppRootStateType, Array<SpotifyApi.PlaylistObjectSimplified>>(state => state.home.featuredPlaylists)
    const newReleases = useSelector<AppRootStateType, Array<SpotifyApi.AlbumObjectSimplified>>(state => state.home.newReleases)
    const isLoading = useSelector<AppRootStateType, boolean>(state => state.home.isLoading)

    useEffect(() => {
        if (!featuredPlaylists.length && !newReleases.length) {
            dispatch(getFeaturedPlaylists())
            dispatch(getNewReleases())
        }
    }, [])

    return (
        <div className={classes.home}>
            <div className={classes.featuredPlaylists}>
                <h2 className={classes.title}>Featured Playlists</h2>

                <div className={classes.items}>

                    {
                        isLoading
                            ? Array(12).fill(<PlaylistCardSkeleton/>)
                            : featuredPlaylists.map(playlist => <PlaylistCard key={playlist.id}
                                                                              playlist={playlist}/>)
                    }
                </div>
            </div>
            <div className={classes.newReleases}>
                <h2 className={classes.title}>New Releases</h2>
                <div className={classes.items}>
                    {
                        isLoading
                            ? Array(12).fill(<PlaylistCardSkeleton/>)
                            : newReleases.map(album => <PlaylistCard key={album.id} playlist={album}/>)
                    }
                </div>
            </div>
        </div>

    );
};

export default Home;
