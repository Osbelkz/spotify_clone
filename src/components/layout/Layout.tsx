import React from 'react';
import classes from "./Layout.module.scss";
import Header from "./Header";
import Player from "./Player";
import Nav from './Nav';

const Layout: React.FC = ({children}) => {
    return (
        <main className={classes.layout}>
            <Nav/>
            <Header/>
            <main className={classes.main}>
                {children}
            </main>
            <Player/>
        </main>
    );
};

export default Layout;
