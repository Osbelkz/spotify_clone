import React from 'react';
import classes from "./Nav.module.scss";
import AppNav from "./appNav/AppNav";
import MyLibraryNav from "./myLibraryNav/MyLibraryNav";

const Nav = React.memo(() => {
    return (
        <nav className={classes.nav}>
            <div className={classes.inner}>
                <AppNav/>
                <MyLibraryNav/>
            </div>
        </nav>
    );
});

export default Nav;
