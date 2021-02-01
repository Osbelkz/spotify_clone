import React, { ChangeEvent } from 'react';
import classes from "./Player.module.scss";

type PropsType = {
    volumeValue: number
    onChange: (value: number) => void
}

const ExtendedControls: React.FC<PropsType> = ({volumeValue, onChange}) => {

    const onChangeVolumeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(+e.target.value)
    }

    return (
        <div className={classes.extendedControls}>
            <input className={classes.trackLine}
                   type="range"
                   min={0}
                   max={1}
                   step={0.05}
                   value={volumeValue}
                   onChange={onChangeVolumeHandler}/>
        </div>
    );
};

export default ExtendedControls;
