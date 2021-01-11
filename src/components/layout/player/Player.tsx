import React, {useEffect, useRef } from 'react';
import { useState } from 'react';
import classes from "./Player.module.scss";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import CurrentTrack from './currentTrack/CurrentTrack';


const Player: React.FC = () => {


    const currentTrack = useSelector<AppRootStateType, SpotifyApi.TrackObjectFull | undefined>(state => state.player.currentTrack)

    if (currentTrack) {}
    console.log(currentTrack)
    const audioRef = useRef<HTMLAudioElement>(null);

    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState();

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

    // videoRef.current!.height

    const play = () => audioRef && audioRef.current && audioRef.current.play();
    const pause = () => audioRef && audioRef.current && audioRef.current.pause();
    const volumeUp = () => {
        if (audioRef && audioRef.current && audioRef.current.volume < 0.9) audioRef.current.volume += 0.1;
        else audioRef && audioRef.current && (audioRef.current.volume = 1);
    };
    const volumeDown = () => {
        if (audioRef && audioRef.current && audioRef.current.volume > 0.1) audioRef.current.volume -= 0.1;
        else audioRef && audioRef.current && (audioRef.current.volume = 0);
    };
    const currentTimeUp = () => {
        if (audioRef && audioRef.current
            && audioRef.current.currentTime < audioRef.current.duration - 0.3) audioRef.current.currentTime += 0.3;
        else audioRef && audioRef.current && (audioRef.current.currentTime = audioRef.current.duration);
    };
    const currentTimeDown = () => {
        if (audioRef && audioRef.current
            && audioRef.current.currentTime > 0.3) audioRef.current.currentTime -= 0.3;
        else audioRef && audioRef.current && (audioRef.current.currentTime = 0);
    };
    const stop = () => {
        audioRef && audioRef.current && audioRef.current.pause();
        audioRef && audioRef.current && (audioRef.current.currentTime = 0);
    };
    return (
        <div className={classes.player}>
            {currentTrack && <CurrentTrack name={currentTrack.name}
                          albumUrl={currentTrack.album.id}
                          artists={currentTrack.artists}
                          thumbnail={currentTrack.album.images[2].url} />}
            <div className={classes.playerControls}>
                <audio
                    src={currentTrack?.preview_url}
                    controls={false}
                    ref={audioRef}
                />
                <div className={classes.controlButtons}>
                    <button>prev</button>
                    <button className={classes.button} onClick={play}>play</button>
                    <button className={classes.button} onClick={pause}>pause</button>
                    <button className={classes.button} onClick={stop}>stop</button>
                    <button>next</button>
                </div>
                <div className={classes.trackProgress}>
                    <button className={classes.button} onClick={currentTimeUp}>currentTimeUp</button>
                    <button className={classes.button} onClick={currentTimeDown}>currentTimeDown</button>
                    duration: {duration} currentTime: {currentTime}
                </div>
            </div>
            <div className={classes.extendedControls}>
                <button className={classes.button} onClick={volumeUp}>volumeUp</button>
                <button className={classes.button} onClick={volumeDown}>volumeDown</button>
            </div>
        </div>
    );
};

export default Player;
