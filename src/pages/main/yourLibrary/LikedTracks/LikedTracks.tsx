import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import Tracklist from "../../../../components/common/tracklist/Tracklist";
import {getMySavedTracks} from '../../../../store/myLibrary-reducer';
import classes from './LikedTracks.module.scss';

const LikedTracks = () => {

    const dispatch = useDispatch()
    const mySavedTracks = useSelector<AppRootStateType, Array<SpotifyApi.SavedTrackObject>>(state => state.myLibrary.mySavedTracks.tracks)
    const containsMySavedTracks = useSelector<AppRootStateType, boolean[]>(state => state.myLibrary.mySavedTracks.containsMySavedTracks)

    useEffect(() => {
        dispatch(getMySavedTracks())
    }, [])

    return (
        <div className={classes.likedTracks}>
            <Tracklist tracks={mySavedTracks} containsMySavedTracks={containsMySavedTracks}/>
        </div>
    );
};

export default LikedTracks;
