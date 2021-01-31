import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import Tracklist from "../../../../components/common/tracklist/Tracklist";
import {getMyRecentlyPlayedTracks, toggleFromYourSavedTracksRecentlyPlayed} from '../../../../store/myLibrary-reducer';
import classes from "./RecentlyPlayed.module.scss";

const RecentlyPlayed = () => {

    const dispatch = useDispatch()
    const myRecentlyPlayedTracks = useSelector<AppRootStateType, Array<SpotifyApi.PlayHistoryObject>>(state => state.myLibrary.myRecentlyPlayedTracks.tracks)
    const containsMySavedTracks = useSelector<AppRootStateType, boolean[]>(state => state.myLibrary.myRecentlyPlayedTracks.containsMySavedTracks)



    useEffect(() => {
        dispatch(getMyRecentlyPlayedTracks())
    }, [dispatch])

    const toggleFromYourSavedTracks = useCallback((trackId: string, value: boolean, index: number) => {
        dispatch(toggleFromYourSavedTracksRecentlyPlayed({trackId, value, index}))
    }, [dispatch])

    return (
        <div className={classes.recentlyPlayed}>
            <Tracklist tracks={myRecentlyPlayedTracks}
                       toggleFromYourSavedTracks={toggleFromYourSavedTracks}
                       containsMySavedTracks={containsMySavedTracks} />
        </div>
    );
};

export default RecentlyPlayed;
