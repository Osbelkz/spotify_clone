import React, {useMemo} from 'react';

import Table, {ITableModel} from "../../../components/common/Table/Table";
import {convertToMMSS} from "../../../helpers/helpers";
import ArtistsLinks from "../../../components/common/artistsLinks/ArtistsLinks";


type PropsType = {
    playTrack: (trackId: string) => void
    album: SpotifyApi.SingleAlbumResponse
}


const Album: React.FC<PropsType> = ({playTrack, album}) => {

    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i: number) => (
                <th style={{width: "10%"}} key={i}>
                    <span>preview</span>
                </th>),
            render: (d: SpotifyApi.TrackObjectSimplified, i: number) => (
                <td style={{width: "10%"}} key={i}>
                    <button onClick={() => playTrack(d.id)}>Play</button>
                </td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "30%"}} key={i}>
                    <span>Name</span>
                </th>),
            render: (d: SpotifyApi.TrackObjectSimplified, i: number) => (
                <td style={{width: "30%"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.name}</div>
                </td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "30%"}} key={i}>
                    <span>Artist</span>
                </th>),
            render: (d: SpotifyApi.TrackObjectSimplified, i: number) => (
                <td style={{width: "30%"}} key={i}>
                    <ArtistsLinks artists={d.artists} />
                </td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "10%"}} key={i}>
                    <span>Duration</span>
                </th>),
            render: (d: SpotifyApi.TrackObjectSimplified, i: number) => (
                <td style={{width: "10%"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{convertToMMSS(d.duration_ms / 1000)}</div>
                </td>)
        },

    ]), [])

    return (
        <div>
            <Table model={testModel} data={album.tracks.items} disabled={false}/>
        </div>
    );
};

export default Album;
