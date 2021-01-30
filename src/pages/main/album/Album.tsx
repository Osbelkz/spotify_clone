import React, {useMemo} from 'react';
import Table, {ITableModel} from "../../../components/common/Table/Table";
import {convertToMMSS} from "../../../helpers/helpers";
import ArtistsLinks from "../../../components/common/artistsLinks/ArtistsLinks";
import TracklistHeader from "../../../components/tracklistHeader/TracklistHeader";
import LikeButton from "../../../components/common/likeButton/LikeButton";


type PropsType = {
    playTrack: (trackId: string) => void
    album: SpotifyApi.SingleAlbumResponse
    containsMySavedTracks: boolean[]
    toggleFromYourSavedTracks: (trackId: string, value: boolean, index: number) => void
    setPlayerQueueHandler: () => void
}


const Album: React.FC<PropsType> = ({playTrack, album, containsMySavedTracks, setPlayerQueueHandler,  toggleFromYourSavedTracks}) => {

    const testModel: ITableModel[] = useMemo(() => ([
        {
            title: (i: number) => (
                <th style={{width: "10%"}} key={i}>
                    <span>preview</span>
                </th>),
            render: (d: SpotifyApi.TrackObjectSimplified, i, dataIndex, isSaved) => (
                <td style={{width: "10%"}} key={i}>
                    <button onClick={() => playTrack(d.id)}>Play</button>
                    <LikeButton value={isSaved}
                                trackId={d.id}
                                dataIndex={dataIndex}
                                onChange={toggleFromYourSavedTracks}/>
                </td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "30%"}} key={i}>
                    <span>Name</span>
                </th>),
            render: (d: SpotifyApi.TrackObjectSimplified, i) => (
                <td style={{width: "30%"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{d.name}</div>
                </td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "30%"}} key={i}>
                    <span>Artist</span>
                </th>),
            render: (d: SpotifyApi.TrackObjectSimplified, i) => (
                <td style={{width: "30%"}} key={i}>
                    <ArtistsLinks artists={d.artists} />
                </td>)
        },
        {
            title: (i: number) => (
                <th style={{width: "10%"}} key={i}>
                    <span>Duration</span>
                </th>),
            render: (d: SpotifyApi.TrackObjectSimplified, i) => (
                <td style={{width: "10%"}} key={i}>
                    <div style={{whiteSpace: "pre-wrap"}}>{convertToMMSS(d.duration_ms / 1000)}</div>
                </td>)
        },

    ]), [])

    return (
        <div>
            <TracklistHeader imageUrl={album.images[0].url}
                             type={album.type}
                             setPlayerQueueHandler={setPlayerQueueHandler}
                             name={album.name}>
                <ArtistsLinks artists={album.artists} />
            </TracklistHeader>
            <Table model={testModel} data={album.tracks.items} disabled={false} contains={containsMySavedTracks}/>
        </div>
    );
};

export default Album;
