import React from 'react';
import classes from "./PlayCurrentButton.module.scss";

type PropsType = {
    onClick: (trackId: string) => void
    trackId: string
    image: string
}

const PlayCurrentButton: React.FC<PropsType> = React.memo(({onClick, trackId}) => {
    return (<button className={classes.button} onClick={() => onClick(trackId)}>Play</button>);
});

export default PlayCurrentButton;
