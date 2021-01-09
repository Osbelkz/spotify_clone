import React from 'react';
import classes from "./AppNav.module.scss";
import {NavLink} from "react-router-dom";
import homeSvg from "../../../assets/UI/home_icon.svg";
import browseSvg from "../../../assets/UI/browse_icon.svg";
import radioSvg from "../../../assets/UI/radio_icon.svg";

const AppNav = () => {
    return (
            <ul className={classes.appNav}>
                <li><NavLink className={classes.link} activeClassName={classes.active} exact to={"/"}>
                    <img src={homeSvg} alt=""/>
                    <span>Home</span>
                </NavLink></li>
                <li><NavLink className={classes.link} activeClassName={classes.active}  to={"/browse"}>
                    <img src={browseSvg} alt=""/>
                    <span>Browse</span>
                </NavLink></li>
                <li><NavLink className={classes.link} activeClassName={classes.active}  to={"/liked-songs"}>
                    <img src={radioSvg} alt=""/>
                    <span>Liked songs</span>
                </NavLink></li>
            </ul>
    );
};

export default AppNav;
