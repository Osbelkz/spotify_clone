import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import Tracklist from "../../../../components/common/tracklist/Tracklist";
import {getMySavedTracks, toggleFromYourSavedTracks} from '../../../../store/myLibrary-reducer';
import classes from './LikedTracks.module.scss';
import TracklistHeader from "../../../../components/tracklistHeader/TracklistHeader";

const LikedTracks = () => {

    const dispatch = useDispatch()
    const mySavedTracks = useSelector<AppRootStateType, Array<SpotifyApi.SavedTrackObject>>(state => state.myLibrary.mySavedTracks.tracks)
    const containsMySavedTracks = useSelector<AppRootStateType, boolean[]>(state => state.myLibrary.mySavedTracks.containsMySavedTracks)

    useEffect(() => {
        dispatch(getMySavedTracks())
    }, [])

    const toggleFromYourSavedTracks_ = useCallback((trackId: string, value: boolean, index: number) => {
        dispatch(toggleFromYourSavedTracks({trackId, value, index}))
    }, [])

    const playTracklist = useCallback((trackId: string, value: boolean, index: number) => {
        mySavedTracks.map(track => track.track.id)
        dispatch(toggleFromYourSavedTracks({trackId, value, index}))
    }, [])

    return (
        <div className={classes.likedTracks}>
            <TracklistHeader imageUrl={""}
                             name={"LikedTracks"}
                             type={"playlist"}
                             setPlayerQueueHandler={() => {}}
            />
            <Tracklist tracks={mySavedTracks}
                       toggleFromYourSavedTracks={toggleFromYourSavedTracks_}
                       containsMySavedTracks={containsMySavedTracks}/>
        </div>
    );
};

export default LikedTracks;
