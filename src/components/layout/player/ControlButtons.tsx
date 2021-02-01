import React from 'react';
import classes from "./ControlButtons.module.scss";
import prevBtnSvg from "../../../assets/UI/player/prev.svg";
import playBtnSvg from "../../../assets/UI/player/Play.svg";
import pauseBtnSvg from "../../../assets/UI/player/pause_icon.svg";
import nextBtnSvg from "../../../assets/UI/player/next_icon.png";

type PropsType = {
    play: () => void
    pause: () => void
    next: () => void
    prev: () => void
    paused: boolean
}

const ControlButtons: React.FC<PropsType> = ({play, pause, prev, next, paused}) => {
    return (
        <div className={classes.controlButtons}>
            <button className={classes.prevTrack} onClick={prev}>
                <img src={prevBtnSvg} alt=""/>
            </button>
            {paused
                ? <button className={classes.playBtn} onClick={play}>
                    <img src={playBtnSvg} alt=""/>
                </button>
                : <button className={classes.pauseBtn} onClick={pause}>
                    <img src={pauseBtnSvg} alt=""/>
                </button>
            }
            <button className={classes.nextTrack} onClick={next}>
                <img src={nextBtnSvg} alt=""/>
            </button>
        </div>
    );
};

export default ControlButtons;
