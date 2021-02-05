import React, {useCallback, useMemo, useState} from 'react';
import Table, {ITableModel} from "../../common/table/Table";
import {convertToMMSS} from "../../../helpers/helpers";
import {getTrack} from "../../../store/player-reducer";
import {useDispatch} from "react-redux";
import {Button} from "../../common/button/Button";
import classes from "./PopularTracks.module.scss";
import PlayCurrentButton from "../../common/playCurrentButton/PlayCurrentButton";

type PropsType = {
    tracks: SpotifyApi.TrackObjectFull[]
    containsMySavedTracks: boolean[]
}


const PopularTracks: React.FC<PropsType> = React.memo(({tracks, containsMySavedTracks}) => {

    const [toggle, setToggle] = useState(false)

    const dispatch = useDispatch()

    const playTrack = useCallback((trackId: string) => {
        dispatch(getTrack({trackId}))
    }, [dispatch])

    const toggleShowTracks = useCallback(() => {
        setToggle(toggle => !toggle)
    }, [])


    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i) => (<span key={i}/>),
            render: (d: SpotifyApi.TrackObjectFull, i) => (
                <td style={{width: "10%"}} key={i}>
                    <PlayCurrentButton onClick={playTrack} image={d.album.images[0].url}  trackId={d.id}/>
                </td>)
        },
        {
            title: (i) => (<span key={i}/>),
            render: (d: SpotifyApi.TrackObjectFull, i, dataIndex, contains) => (
                <td style={{width: "5%"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>
                        {dataIndex+1}
                        <div>{contains ? "yes" : "no"}</div>
                    </div>
                </td>)
        },
        {
            title: (i) => (<span key={i}/>),
            render: (d: SpotifyApi.TrackObjectFull, i) => (
                <td style={{width: "60%"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>
                        {d.name}
                    </div>
                </td>)
        },
        {
            title: (i) => (<span key={i}/>),
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
            {tracks.length > 5
                ? <Button onClick={toggleShowTracks}>
                    {toggle ? `Show 5 less` : `Show 5 more`}
                </Button>
                : null
            }
        </div>
    );
});

export default PopularTracks;
