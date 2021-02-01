import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import classes from "./Player.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import CurrentTrack from './currentTrack/CurrentTrack';
import {getTrack} from "../../../store/player-reducer";
import ControlButtons from "./ControlButtons";
import TrackProgress from "./TrackProgress";
import ExtendedControls from "./ExtendedControls";

const Player: React.FC = React.memo(() => {

    const dispatch = useDispatch()
    const currentTrack = useSelector<AppRootStateType, SpotifyApi.SingleTrackResponse | null>(state => state.player.currentTrack)
    const queue = useSelector<AppRootStateType, string[]>(state => state.player.queue)

    const audioRef = useRef<HTMLAudioElement>(null);

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [trackNumber, setTrackNumber] = useState(0)

    useEffect(() => {
        dispatch(getTrack({trackId: queue[trackNumber]}))
    }, [queue, trackNumber, dispatch])

    useEffect(() => {
        setInterval(() => {
            // @ts-ignore
            setDuration(audioRef && audioRef.current && audioRef.current.duration);
            if (audioRef && audioRef.current && audioRef.current.currentTime === audioRef.current.duration) {
                audioRef.current.currentTime = 0;
            }
            // @ts-ignore
            setCurrentTime(audioRef && audioRef.current && audioRef.current.currentTime);
        }, 1000);
    }, [currentTrack, trackNumber]);


    useEffect(() => {
        if (audioRef && audioRef.current && audioRef.current.ended) {
            dispatch(getTrack({trackId: queue[trackNumber + 1]}))
        }
    }, [currentTrack, queue, trackNumber, dispatch])

    useEffect(() => {
        audioRef && audioRef.current && audioRef.current.play()
    }, [currentTrack])

    const play = () => audioRef && audioRef.current && audioRef.current.play();
    const pause = () => audioRef && audioRef.current && audioRef.current.pause();
    const nextTrack = () => setTrackNumber(num => num + 1)
    const prevTrack = () => setTrackNumber(num => num - 1)
    const changeTrackProgress = (currentTime: number) => {
        if (audioRef && audioRef.current) {
            audioRef.current.currentTime = currentTime
        }
    }
    const changeVolume = (value: number) => {
        if (audioRef && audioRef.current) {
            audioRef.current.volume = value
        }
    }

    return (
        <div className={classes.player}>
            <audio
                src={currentTrack?.preview_url ? currentTrack?.preview_url : ""}
                controls={false}
                ref={audioRef}
            />
            {currentTrack
                ? <CurrentTrack name={currentTrack.name}
                                albumUrl={currentTrack.album.id}
                                artists={currentTrack.artists}
                                thumbnail={currentTrack.album.images[2].url}/>
                : <div style={{minWidth: "25%"}}></div>
            }
            <div className={classes.playerControls}>
                <ControlButtons play={play} pause={pause} next={nextTrack} prev={prevTrack} paused={audioRef?.current?.paused ?? true}/>
                <TrackProgress duration={duration | 0} progressTime={currentTime | 0} onChange={changeTrackProgress}/>
            </div>
            <ExtendedControls volumeValue={audioRef.current ? audioRef.current.volume : 0} onChange={changeVolume} />
        </div>
    );
});

export default Player;
