import React from 'react';
import classes from "./AppNav.module.scss";
import {NavLink} from "react-router-dom";
import homeSvg from "../../../assets/UI/nav/home_icon.svg";
import browseSvg from "../../../assets/UI/nav/browse_icon.svg";
import radioSvg from "../../../assets/UI/nav/radio_icon.svg";

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
                <li><NavLink className={classes.link} activeClassName={classes.active}  to={"/radio"}>
                    <img src={radioSvg} alt=""/>
                    <span>Radio</span>
                </NavLink></li>
            </ul>
    );
};

export default AppNav;
