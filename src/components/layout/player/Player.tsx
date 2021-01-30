import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import classes from "./Player.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import CurrentTrack from './currentTrack/CurrentTrack';
import playBtnSvg from "../../../assets/UI/player/Play.svg"
import pauseBtnSvg from "../../../assets/UI/player/pause_icon.svg"
import prevBtnSvg from "../../../assets/UI/player/prev.svg"
import nextBtnSvg from "../../../assets/UI/player/next_icon.png"
import {convertToMMSS} from '../../../helpers/helpers';
import {getTrack} from "../../../store/player-reducer";

const Player: React.FC = () => {

    const dispatch = useDispatch()
    const currentTrack = useSelector<AppRootStateType, SpotifyApi.SingleTrackResponse | null>(state => state.player.currentTrack)
    const queue = useSelector<AppRootStateType, string[]>(state => state.player.queue)

    const audioRef = useRef<HTMLAudioElement>(null);

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [trackNumber, setTrackNumber] = useState(0)

    useEffect(() => {
        dispatch(getTrack({trackId:queue[trackNumber]}))
    }, [queue, trackNumber])

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
            dispatch(getTrack({trackId: queue[trackNumber+1]}))
        }
    }, [currentTrack, queue, trackNumber])

    useEffect(() => {
        audioRef && audioRef.current && audioRef.current.play()
    }, [currentTrack])

    const play = () => audioRef && audioRef.current && audioRef.current.play();
    const pause = () => audioRef && audioRef.current && audioRef.current.pause();
    const nextTrack = () => setTrackNumber(num => num+1)
    const prevTrack = () => {
        setTrackNumber(num => num - 1)
    }


    return (
        <div className={classes.player}>

            {currentTrack
                ? <CurrentTrack name={currentTrack.name}
                                albumUrl={currentTrack.album.id}
                                artists={currentTrack.artists}
                                thumbnail={currentTrack.album.images[2].url}/>
                : <div style={{minWidth:"25%"}}></div>
            }
            <div className={classes.playerControls}>
                <audio
                    src={currentTrack?.preview_url ? currentTrack?.preview_url : ""}
                    controls={false}
                    ref={audioRef}
                />
                <div className={classes.controlButtons}>
                    <button className={classes.prevTrack} onClick={prevTrack}>
                        <img src={prevBtnSvg} alt=""/>
                    </button>
                    {audioRef.current && audioRef.current.paused
                        ? <button className={classes.playBtn} onClick={play}>
                            <img src={playBtnSvg} alt=""/>
                        </button>
                        : <button className={classes.pauseBtn} onClick={pause}>
                            <img src={pauseBtnSvg} alt=""/>
                        </button>
                    }
                    <button className={classes.nextTrack} onClick={nextTrack}>
                        <img src={nextBtnSvg} alt=""/>
                    </button>
                </div>
                <div className={classes.trackProgress}>
                    <p className={classes.currentTime}>{convertToMMSS(currentTime)}</p>
                    <input className={classes.trackLine}
                           type="range"
                           step={1}
                           min={0}
                           max={Math.floor(duration) | 0}
                           value={Math.floor(currentTime) | 0}
                           onChange={(e) => {
                               if (audioRef && audioRef.current) {
                                   audioRef.current.currentTime = +e.target.value
                               }
                           }}/>
                    <p className={classes.duration}>{convertToMMSS(duration | 0)} </p>
                </div>
            </div>
            <div className={classes.extendedControls}>
                <input className={classes.trackLine}
                       type="range"
                       min={0}
                       max={1}
                       step={0.05}
                       value={audioRef.current ? audioRef.current.volume : 0}
                       onChange={(e) => {
                           if (audioRef && audioRef.current) {
                               audioRef.current.volume = +e.target.value
                           }
                       }}/>
            </div>
        </div>
    );
};

export default Player;
