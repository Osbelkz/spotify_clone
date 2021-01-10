import classes from './Player.module.scss';
import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {tokenDataType} from "../../store/app-reducer";

const Player = () => {

    const token = useSelector<AppRootStateType, tokenDataType>(state => state.app.token)

    return (
        <div className={classes.player}>
        </div>
    );
};

export default Player;
