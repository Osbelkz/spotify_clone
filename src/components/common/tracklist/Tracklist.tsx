import React, {useCallback, useMemo} from 'react';
import Table, {ITableModel} from "../Table/Table";
import {convertToMMSS} from "../../../helpers/helpers";
import {useDispatch} from "react-redux";
import {getTrack} from "../../../store/player-reducer";
import ArtistsLinks from "../artistsLinks/ArtistsLinks";
import {Link} from "react-router-dom";
import LikeButton from "../likeButton/LikeButton";
import PlayCurrentButton from "../PlayCurrentButton/PlayCurrentButton";

type PropsType = {
    tracks: Array<SpotifyApi.SavedTrackObject | SpotifyApi.PlayHistoryObject>
    containsMySavedTracks: boolean[]
    toggleFromYourSavedTracks: (trackId: string, value: boolean, index: number) => void
}

const Tracklist: React.FC<PropsType> = React.memo(({tracks, containsMySavedTracks, toggleFromYourSavedTracks}) => {

    const dispatch = useDispatch()

    const playTrack = useCallback((trackId: string) => {
        dispatch(getTrack({trackId}))
    }, [dispatch])
    // console.log("tracklist", tracks)

    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i) => (
                <th style={{width: "10%"}} key={i}>
                    <span>preview</span>
                </th>),
            render: (d: SpotifyApi.SavedTrackObject, i, dataIndex, isSaved) => (
                <td style={{width: "10%"}} key={i}>
                    <PlayCurrentButton onClick={playTrack} image={d.track.album.images[0].url} trackId={d.track.id}/>
                    <LikeButton value={isSaved}
                                trackId={d.track.id}
                                dataIndex={dataIndex}
                                onChange={toggleFromYourSavedTracks}/>
                </td>)
        },
        {
            title: (i) => (
                <th style={{width: "30%"}} key={i}>
                    <span>Name</span>
                </th>),
            render: (d: SpotifyApi.SavedTrackObject, i) => (
                <td style={{width: "30%"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.track.name}</div>
                </td>)
        },
        {
            title: (i) => (
                <th style={{width: "30%"}} key={i}>
                    <span>Artist</span>
                </th>),
            render: (d: SpotifyApi.SavedTrackObject, i) => (
                <td style={{width: "30%"}} key={i}>
                    <ArtistsLinks artists={d.track.artists}/>
                </td>)
        },
        {
            title: (i) => (
                <th style={{width: "30%"}} key={i}>
                    <span>Album</span>
                </th>),
            render: (d: SpotifyApi.SavedTrackObject, i) => (
                <td style={{width: "30%"}} key={i}>
                    <Link to={{pathname: `/album/${d.track.album.id}`}} style={{whiteSpace: "pre-wrap", color: "inherit"}}>{d.track.album.name}</Link>
                </td>)
        },
        {
            title: (i) => (
                <th style={{width: "10%"}} key={i}>
                    <span>Duration</span>
                </th>),
            render: (d: SpotifyApi.SavedTrackObject, i) => (
                <td style={{width: "30%"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{convertToMMSS(d.track.duration_ms / 1000)}</div>
                </td>)
        },

    ]), [playTrack, toggleFromYourSavedTracks])


    return (
        <Table model={testModel} data={tracks} contains={containsMySavedTracks} disabled={false}/>
    );
});

export default Tracklist;
