import React, {useMemo} from 'react';
import Table, {ITableModel} from "../../../assets/UI/Table/Table";
import {convertToMMSS} from "../../../helpers/helpers";
import {useDispatch} from "react-redux";
import {getTrack} from "../../../store/player-reducer";

type PropsType = {
    tracks: Array<SpotifyApi.SavedTrackObject | SpotifyApi.PlayHistoryObject>
}

const Tracklist: React.FC<PropsType> = ({tracks}) => {

    const dispatch = useDispatch()

    debugger

    const playTrack = (trackId: string) => {
        dispatch(getTrack({trackId}))
    }
    console.log("tracklist", tracks)
    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i: number) => (
                <th style={{width: "10%", paddingLeft: "20px"}} key={i}>
                    <span>preview</span>
                </th>),
            render: (d: SpotifyApi.SavedTrackObject, i: number) => (
                <td style={{width: "10%", paddingLeft: "20px"}} key={i}>
                    <button onClick={() => playTrack(d.track.id)}>Play</button>
                </td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <span>Name</span>
                </th>),
            render: (d: SpotifyApi.SavedTrackObject, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.track.name}</div>
                </td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <span>Artist</span>
                </th>),
            render: (d: SpotifyApi.SavedTrackObject, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.track.artists.map(artist => artist.name).join(", ")}</div>
                </td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <span>Album</span>
                </th>),
            render: (d: SpotifyApi.SavedTrackObject, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.track.album.name}</div>
                </td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "10%", paddingRight: "20px"}} key={i}>
                    <span>Duration</span>
                </th>),
            render: (d: SpotifyApi.SavedTrackObject, i: number) => (
                <td style={{width: "30%", paddingRight: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{convertToMMSS(d.track.duration_ms / 1000)}</div>
                </td>)
        },

    ]), [])


    return (
        <Table model={testModel} data={tracks} disabled={false}/>
    );
};

export default Tracklist;
