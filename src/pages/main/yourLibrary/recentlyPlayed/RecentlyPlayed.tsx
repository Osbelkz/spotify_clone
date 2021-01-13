import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import Tracklist from "../../../../components/common/tracklist/Tracklist";
import { getMyRecentlyPlayedTracks } from '../../../../store/myLibrary-reducer';
import classes from "./RecentlyPlayed.module.scss";


const RecentlyPlayed = () => {

    const dispatch = useDispatch()
    const myRecentlyPlayedTracks = useSelector<AppRootStateType, Array<SpotifyApi.PlayHistoryObject>>(state => state.myLibrary.myRecentlyPlayedTracks)


    useEffect(() => {
        dispatch(getMyRecentlyPlayedTracks())
    }, [])

    return (
        <div className={classes.recentlyPlayed}>
            <Tracklist tracks={myRecentlyPlayedTracks} />
        </div>
    );
};

export default RecentlyPlayed;
