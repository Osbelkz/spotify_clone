import React, {useEffect, useMemo} from 'react';
import Table, {ITableModel} from "../../../../assets/UI/Table/Table";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import {getMyRecentlyPlayedTracks, getMySavedTracks} from "../../../../store/home-reducer";

const RecentlyPlayed = () => {

    const dispatch = useDispatch()
    const myRecentlyPlayedTracks = useSelector<AppRootStateType, Array<SpotifyApi.PlayHistoryObject>>(state => state.home.myRecentlyPlayedTracks)

    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i: number) => (<th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                <span>Name</span>
            </th>),
            render: (d:  SpotifyApi.PlayHistoryObject, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.track.name}</div>
                </td>)
        },
        {
            title: (i: number) => (<th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                <span>Artist</span>
            </th>),
            render: (d:  SpotifyApi.PlayHistoryObject, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.track.artists.map(artist => artist.name).join(", ")}</div>
                </td>)
        },
        {
            title: (i: number) => (<th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                <span>Artist</span>
            </th>),
            render: (d:  SpotifyApi.PlayHistoryObject, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.track.uri}</div>
                </td>)
        },

    ]), [])

    useEffect(() => {
        dispatch(getMyRecentlyPlayedTracks())
    }, [])

    return (
        <div>
            <Table model={testModel} data={myRecentlyPlayedTracks} disabled={false} />
        </div>
    );
};

export default RecentlyPlayed;
