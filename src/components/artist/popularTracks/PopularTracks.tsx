import React, {useCallback, useMemo, useState} from 'react';
import Table, {ITableModel} from "../../common/Table/Table";
import {convertToMMSS} from "../../../helpers/helpers";
import {getTrack} from "../../../store/player-reducer";
import {useDispatch} from "react-redux";
import {Button} from "../../common/button/Button";
import classes from "./PopularTracks.module.scss";

type PropsType = {
    tracks: SpotifyApi.TrackObjectFull[]
    containsMySavedTracks: boolean[]
}


const PopularTracks: React.FC<PropsType> = ({tracks, containsMySavedTracks}) => {

    const [toggle, setToggle] = useState(false)

    const dispatch = useDispatch()

    const playTrack = useCallback((trackId: string) => {
        dispatch(getTrack({trackId}))
    }, [dispatch])

    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i) => (<th key={i}></th>),
            render: (d: SpotifyApi.TrackObjectFull, i) => (
                <td style={{width: "10%"}} key={i}>
                    <button onClick={() => playTrack(d.id)}>Play</button>
                </td>)
        },
        {
            title: (i) => (<th key={i}></th>),
            render: (d: SpotifyApi.TrackObjectFull, i, dataIndex, contains) => (
                <td style={{width: "5%"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>
                        {dataIndex+1}
                        <div>{contains ? "yes" : "no"}</div>
                    </div>
                </td>)
        },
        {
            title: (i) => (<th key={i}></th>),
            render: (d: SpotifyApi.TrackObjectFull, i) => (
                <td style={{width: "60%"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>
                        {d.name}
                    </div>
                </td>)
        },
        {
            title: (i) => (<th key={i}></th>),
            render: (d: SpotifyApi.TrackObjectFull, i) => (
                <td style={{width: "30%"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>
                        {convertToMMSS(d.duration_ms / 1000)}
                    </div>
                </td>)
        },

    ]), [playTrack])

    return (
        <div className={classes.popularTracks}>
            <h3 className={classes.title}>Popular</h3>

            <div className={classes.table}>
                <Table
                    model={testModel}
                    contains={containsMySavedTracks}
                    data={toggle ? tracks : tracks?.slice(0, 5)}/>
            </div>
            <Button onClick={() => setToggle(!toggle)}>
                {toggle ? `Show 5 less` : `Show 5 more`}
            </Button>
        </div>
    );
};

export default PopularTracks;
