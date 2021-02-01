import React from 'react';
import classes from "./Header.module.scss";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import userIcon from "../../assets/UI/user_icon.svg"
import arrowDownIcon from "../../assets/UI/arrow_down_icon.svg"

const Header = React.memo(() => {

    const username = useSelector<AppRootStateType, string | undefined>(state => state.home.displayName)

    return (
        <header className={classes.header}>
            <div className={classes.userSettings}>
                <img src={userIcon} alt=""/>
                <span className={classes.username}>{username}</span>
                <img src={arrowDownIcon} alt=""/>
            </div>
        </header>
    );
});

export default Header;
