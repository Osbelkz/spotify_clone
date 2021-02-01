import React, { ChangeEvent } from 'react';
import classes from "./TrackProgress.module.scss";
import {convertToMMSS} from "../../../helpers/helpers";

type PropsType = {
    duration: number
    progressTime: number
    onChange: (currentTime: number) => void
}

const TrackProgress: React.FC<PropsType> = ({duration, progressTime, onChange}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onChange(+e.target.value)
    }

    return (
        <div className={classes.trackProgress}>
            <p className={classes.currentTime}>{convertToMMSS(progressTime)}</p>
            <input className={classes.trackLine}
                   type="range"
                   step={1}
                   min={0}
                   max={Math.floor(duration) | 0}
                   value={Math.floor(progressTime) | 0}
                   onChange={onChangeHandler}/>
            <p className={classes.duration}>{convertToMMSS(duration)} </p>
        </div>
    );
};

export default TrackProgress;
