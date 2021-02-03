import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import Tracklist from "../../../../components/common/tracklist/Tracklist";
import classes from './LikedTracks.module.scss';
import TracklistHeader from "../../../../components/common/tracklist/TracklistHeader";
import { getMySavedTracks, toggleFromYourSavedTracks } from '../../../../store/tracklists-reducer';

const LikedTracks = () => {

    const dispatch = useDispatch()
    const mySavedTracks = useSelector<AppRootStateType, Array<SpotifyApi.SavedTrackObject>>(state => state.tracklists.mySavedTracks.tracks)
    const containsMySavedTracks = useSelector<AppRootStateType, boolean[]>(state => state.tracklists.mySavedTracks.containsMySavedTracks)

    useEffect(() => {
        dispatch(getMySavedTracks())
    }, [dispatch])

    const toggleFromYourSavedTracksHandler = useCallback((trackId: string, value: boolean, index: number) => {
        dispatch(toggleFromYourSavedTracks({trackId, value, index, tracklistName: "mySavedTracks"}))
    }, [dispatch])

    const playTracklist = useCallback((trackId: string, value: boolean, index: number) => {
        mySavedTracks.map(track => track.track.id)
    }, [dispatch, mySavedTracks])

    return (
        <div className={classes.likedTracks}>
            <TracklistHeader imageUrl={""}
                             name={"LikedTracks"}
                             type={"playlist"}
                             setPlayerQueueHandler={() => {}}
            />
            <Tracklist tracks={mySavedTracks}
                       toggleFromYourSavedTracks={toggleFromYourSavedTracksHandler}
                       containsMySavedTracks={containsMySavedTracks}/>
        </div>
    );
};

export default LikedTracks;
