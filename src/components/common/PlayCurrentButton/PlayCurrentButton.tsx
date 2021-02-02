import React from 'react';
import classes from "./PlayCurrentButton.module.scss";

type PropsType = {
    onClick: (trackId: string) => void
    trackId: string
    image: string
}

const PlayCurrentButton: React.FC<PropsType> = React.memo(({onClick, trackId}) => {
    return (
        <button className={classes.button} onClick={() => onClick(trackId)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <path className={classes.svgIcon}
                      d="M5,4.00150607 C5,3.22971524 5.83721439,2.74884414 6.50387103,3.13772717 L16.503871,9.13772717 C17.1653763,9.52360527 17.1653763,10.4794069 16.503871,10.865285 L6.50387103,16.865285 C5.83721439,17.254168 5,16.7732969 5,16.0015061 L5,4.00150607 Z M7,5.74254307 L7,14.2604691 L14.0153651,10.0015061 L7,5.74254307 Z"/>
            </svg>
        </button>);
});

export default PlayCurrentButton;
