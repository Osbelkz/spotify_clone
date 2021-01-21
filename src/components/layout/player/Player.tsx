import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import classes from "./Player.module.scss";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import CurrentTrack from './currentTrack/CurrentTrack';
import playBtnSvg from "../../../assets/UI/player/Play.svg"
import pauseBtnSvg from "../../../assets/UI/player/pause_icon.svg"
import prevBtnSvg from "../../../assets/UI/player/prev.svg"
import nextBtnSvg from "../../../assets/UI/player/next_icon.png"
import {convertToMMSS} from '../../../helpers/helpers';

const Player: React.FC = () => {


    const currentTrack = useSelector<AppRootStateType, SpotifyApi.SingleTrackResponse | null>(state => state.player.currentTrack)

    const audioRef = useRef<HTMLAudioElement>(null);

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        if (audioRef.current) {
            // audioRef.current.play();
        }
    }, [currentTrack])


    useEffect(() => {
        setInterval(() => {
            // @ts-ignore
            setDuration(audioRef && audioRef.current && audioRef.current.duration);
            if (audioRef && audioRef.current && audioRef.current.currentTime === audioRef.current.duration) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
            // @ts-ignore
            setCurrentTime(audioRef && audioRef.current && audioRef.current.currentTime);
        }, 1000);
    }, []);

    const play = () => audioRef && audioRef.current && audioRef.current.play();
    const pause = () => audioRef && audioRef.current && audioRef.current.pause();


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
                    <button className={classes.prevTrack}>
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
                    <button className={classes.nextTrack}>
                        <img src={nextBtnSvg} alt=""/>
                    </button>
                </div>
                <div className={classes.trackProgress}>
                    <p className={classes.currentTime}>{convertToMMSS(currentTime)}</p>
                    <input className={classes.trackLine}
                           type="range"
                           step={1}
                           min={0}
                           max={Math.floor(duration)}
                           value={Math.floor(currentTime)}
                           onChange={(e) => {
                               if (audioRef && audioRef.current) {
                                   audioRef.current.currentTime = +e.target.value
                               }
                           }}/>
                    <p className={classes.duration}>{convertToMMSS(duration)} </p>
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
