import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import Tracklist from "../../../../components/common/tracklist/Tracklist";
import classes from "./RecentlyPlayed.module.scss";
import { getMyRecentlyPlayedTracks, toggleFromYourSavedTracks } from '../../../../store/tracklists-reducer';
import TracklistHeader from "../../../../components/common/tracklist/TracklistHeader";

const RecentlyPlayed = () => {

    const dispatch = useDispatch()
    const myRecentlyPlayedTracks = useSelector<AppRootStateType, Array<SpotifyApi.PlayHistoryObject>>(state => state.tracklists.myRecentlyPlayedTracks.tracks)
    const containsMySavedTracks = useSelector<AppRootStateType, boolean[]>(state => state.tracklists.myRecentlyPlayedTracks.containsMySavedTracks)



    useEffect(() => {
        dispatch(getMyRecentlyPlayedTracks())
    }, [dispatch])

    const toggleFromYourSavedTracksHandler = useCallback((trackId: string, value: boolean, index: number) => {
        dispatch(toggleFromYourSavedTracks({trackId, value, index, tracklistName: "myRecentlyPlayedTracks"}))
    }, [dispatch])

    return (
        <div className={classes.recentlyPlayed}>
            <TracklistHeader imageUrl={""}
                             name={"Recently Played"}
                             type={"playlist"}
                             setPlayerQueueHandler={() => {}} />
            <Tracklist tracks={myRecentlyPlayedTracks}
                       toggleFromYourSavedTracks={toggleFromYourSavedTracksHandler}
                       containsMySavedTracks={containsMySavedTracks} />
        </div>
    );
};

export default RecentlyPlayed;
