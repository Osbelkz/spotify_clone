import React, {useEffect, useMemo} from 'react';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getAlbum} from "../../../store/album-reducer";
import {AppRootStateType} from "../../../store/store";
import Table, {ITableModel} from "../../../assets/UI/Table/Table";
import {convertToMMSS} from "../../../helpers/helpers";
import {getTrack} from "../../../store/player-reducer";

const Album = () => {

    let {id} = useParams<{id: string}>()

    const dispatch = useDispatch()
    const album = useSelector<AppRootStateType, SpotifyApi.SingleAlbumResponse | null>(state => state.album.album)

    console.log("album page",album)

    useEffect(() => {
        dispatch(getAlbum({id}))
    }, [id])

    const playTrack = (trackId: string) => {
        dispatch(getTrack({trackId}))
    }

    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i: number) => (
                <th style={{width: "10%", paddingLeft: "20px"}} key={i}>
                    <span>preview</span>
                </th>),
            render: (d: SpotifyApi.TrackObjectSimplified, i: number) => (
                <td style={{width: "10%", paddingLeft: "20px"}} key={i}>
                    <button onClick={() => playTrack(d.id)}>Play</button>
                </td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <span>Name</span>
                </th>),
            render: (d: SpotifyApi.TrackObjectSimplified, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.name}</div>
                </td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <span>Artist</span>
                </th>),
            render: (d: SpotifyApi.TrackObjectSimplified, i: number) => (
                <td style={{width: "30%", paddingLeft: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.artists.map(artist => artist.name).join(", ")}</div>
                </td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "10%", paddingRight: "20px"}} key={i}>
                    <span>Duration</span>
                </th>),
            render: (d: SpotifyApi.TrackObjectSimplified, i: number) => (
                <td style={{width: "30%", paddingRight: "20px"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{convertToMMSS(d.duration_ms / 1000)}</div>
                </td>)
        },

    ]), [])

    return (
        <div>
            {album && <Table model={testModel} data={album.tracks.items} disabled={false}/>}

        </div>
    );
};

export default Album;
