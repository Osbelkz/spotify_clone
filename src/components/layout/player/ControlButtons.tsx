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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <path className={classes.svgIcon}
                          d="M14.4700011,4.1520017 L6.47000106,9.1520017 C5.84333298,9.54366925 5.84333298,10.4563308 6.47000106,10.8479983 L14.4700011,15.8479983 C15.1360491,16.2642783 16,15.7854355 16,15 L16,5 C16,4.21456446 15.1360491,3.73572169 14.4700011,4.1520017 Z M5,4 C4.44771525,4 4,4.44771525 4,5 L4,15 C4,15.5522847 4.44771525,16 5,16 C5.55228475,16 6,15.5522847 6,15 L6,5 C6,4.44771525 5.55228475,4 5,4 Z M14,6.80424764 L14,13.1957524 L8.88679623,10 L14,6.80424764 Z"/>
                </svg>
            </button>
            {paused
                ? <button className={classes.playBtn} onClick={play}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path className={classes.svgIcon}
                              d="M5,4.00150607 C5,3.22971524 5.83721439,2.74884414 6.50387103,3.13772717 L16.503871,9.13772717 C17.1653763,9.52360527 17.1653763,10.4794069 16.503871,10.865285 L6.50387103,16.865285 C5.83721439,17.254168 5,16.7732969 5,16.0015061 L5,4.00150607 Z M7,5.74254307 L7,14.2604691 L14.0153651,10.0015061 L7,5.74254307 Z"/>
                    </svg>

                </button>
                : <button className={classes.pauseBtn} onClick={pause}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <path className={classes.svgIcon}
                              d="M8,4 C8.55228475,4 9,4.44771525 9,5 L9,15 C9,15.5522847 8.55228475,16 8,16 C7.44771525,16 7,15.5522847 7,15 L7,5 C7,4.44771525 7.44771525,4 8,4 Z M12,4 C12.5522847,4 13,4.44771525 13,5 L13,15 C13,15.5522847 12.5522847,16 12,16 C11.4477153,16 11,15.5522847 11,15 L11,5 C11,4.44771525 11.4477153,4 12,4 Z"/>
                    </svg>
                </button>
            }
            <button className={classes.nextTrack} onClick={next}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <path className={classes.svgIcon}
                          d="M5.52999894,4.1520017 L13.5299989,9.1520017 C14.156667,9.54366925 14.156667,10.4563308 13.5299989,10.8479983 L5.52999894,15.8479983 C4.86395093,16.2642783 4,15.7854355 4,15 L4,5 C4,4.21456446 4.86395093,3.73572169 5.52999894,4.1520017 Z M15,4 C15.5522847,4 16,4.44771525 16,5 L16,15 C16,15.5522847 15.5522847,16 15,16 C14.4477153,16 14,15.5522847 14,15 L14,5 C14,4.44771525 14.4477153,4 15,4 Z M6,6.80424764 L6,13.1957524 L11.1132038,10 L6,6.80424764 Z"/>
                </svg>
            </button>
        </div>
    );
};

export default ControlButtons;
