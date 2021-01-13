import React, {useEffect, useMemo} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import Table, {ITableModel} from "../../../assets/UI/Table/Table";
import {convertToMMSS} from "../../../helpers/helpers";
import {getTrack} from "../../../store/player-reducer";
import {getPlaylist} from "../../../store/playlist-reducer";

const Playlist = () => {

    let {id} = useParams<{id: string}>()

    const dispatch = useDispatch()
    const playlist = useSelector<AppRootStateType, SpotifyApi.SinglePlaylistResponse | null>(state => state.playlist.playlist)

    console.log("playlist page", playlist)

    useEffect(() => {
        dispatch(getPlaylist({id}))
    }, [])

    const playTrack = (trackId: string) => {
        dispatch(getTrack({trackId}))
    }

    const testModel: ITableModel[] = useMemo(() => ([
        // {
        //     title: (i: number) => (
        //         <th style={{width: "10%", paddingLeft: "20px"}} key={i}>
        //             <span>preview</span>
        //         </th>),
        //     render: (d: SpotifyApi.PlaylistTrackObject, i: number) => (
        //         <td style={{width: "10%", paddingLeft: "20px"}} key={i}>
        //             <button onClick={() => playTrack(d.track.preview_url)}>Play</button>
        //         </td>)
        // },
        {
            title: (i: number) => (
                <th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <span>Name</span>
                </th>),
            render: (d: SpotifyApi.PlaylistTrackObject, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.track.name}</div>
                </td>)
        },
        // {
        //     title: (i: number) => (
        //         <th style={{width: "30%", paddingLeft: "20px"}} key={i}>
        //             <span>Artist</span>
        //         </th>),
        //     render: (d: SpotifyApi.PlaylistTrackObject, i: number) => (
        //         <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
        //             <div style={{whiteSpace: "pre-wrap"}}>{d.track.artists.map(artist => artist.name).join(", ")}</div>
        //         </td>)
        // },
        {
            title: (i: number) => (
                <th style={{width: "10%", paddingRight: "20px"}} key={i}>
                    <span>Duration</span>
                </th>),
            render: (d: SpotifyApi.PlaylistTrackObject, i: number) => (
                <td style={{width: "30%", paddingRight: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{convertToMMSS(d.track.duration_ms / 1000)}</div>
                </td>)
        },

    ]), [])

    return (
        <div>
            {playlist && <Table model={testModel} data={playlist.tracks.items} disabled={false}/>}

        </div>
    );
};

export default Playlist;
