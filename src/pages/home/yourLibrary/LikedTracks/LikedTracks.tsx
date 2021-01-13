import React, {useEffect, useMemo} from 'react';
import Table, {ITableModel} from "../../../../assets/UI/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import {getMySavedTracks} from "../../../../store/home-reducer";
import {setTrack} from "../../../../store/player-reducer";

const LikedTracks = () => {

    const dispatch = useDispatch()
    const mySavedTracks = useSelector<AppRootStateType, Array<SpotifyApi.SavedTrackObject>>(state => state.home.mySavedTracks)

    const playTrack = (track: SpotifyApi.TrackObjectSimplified) => {
        dispatch(setTrack(track))
    }

    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i: number) => (<th style={{width: "10%", paddingLeft: "20px"}} key={i}>
                <span>preview</span>
            </th>),
            render: (d:  SpotifyApi.PlayHistoryObject, i: number) => (
                <td style={{width: "10%", paddingLeft: "20px"}} key={i}>
                    <button onClick={() => playTrack(d.track)}>Play</button>
                </td>)
        },
        {
            title: (i: number) => (<th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                <span>Name</span>
            </th>),
            render: (d:  SpotifyApi.SavedTrackObject, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.track.name}</div>
                </td>)
        },
        {
            title: (i: number) => (<th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                <span>Artist</span>
            </th>),
            render: (d:  SpotifyApi.SavedTrackObject, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.track.artists.map(artist => artist.name).join(", ")}</div>
                </td>)
        },
        {
            title: (i: number) => (<th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                <span>Artist</span>
            </th>),
            render: (d:  SpotifyApi.SavedTrackObject, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.track.uri}</div>
                </td>) 
        },

    ]), [])

    useEffect(() => {
        dispatch(getMySavedTracks())
    }, [])

    return (
        <div>
            <Table model={testModel} data={mySavedTracks} disabled={false} />
        </div>
    );
};

export default LikedTracks;