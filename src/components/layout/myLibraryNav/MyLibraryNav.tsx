import React from 'react';
import classes from "./MyLibraryNav.module.scss";
import {NavLink} from "react-router-dom";


const MyLibraryNav = () => {

    const myLibraryItems = [
        {to: "/made-for-you", title: "Made For You"},
        {to: "/recently-played", title: "Recently Played"},
        {to: "/liked-songs", title: "Liked Songs"},
        {to: "/albums", title: "Albums"},
        {to: "/artists", title: "Artists"},
        {to: "/podcasts", title: "Podcasts"},
    ]

    return (
        <div className={classes.myLibraryNav}>
            <div className={classes.title}>Your library</div>
            <ul className={classes.nav}>
                {myLibraryItems.map((item, index) => <li key={index}>
                    <NavLink to={item.to} className={classes.link} activeClassName={classes.active}>{item.title}</NavLink>
                </li>
                )}
            </ul>
        </div>
    );
};

export default MyLibraryNav;
