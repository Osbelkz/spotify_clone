import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import { getMyInfo } from '../../store/home-reducer';
import Layout from "../../components/layout/Layout";
import {Route, Switch } from 'react-router-dom';
import RecentlyPlayed from "./yourLibrary/recentlyPlayed/RecentlyPlayed";
import LikedTracks from "./yourLibrary/LikedTracks/LikedTracks";
import Home from "./home/Home";
import Album from "./album/Album";
import Playlist from './playlist/Playlist';
import Artist from "./artist/Artist";

const Main:React.FC = ({}) => {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getMyInfo())
    },[])



    return (
        <Layout>
            <Switch>
                <Route path={"/"} exact component={Home}/>
                <Route path={"/album/:id"} component={Album}/>
                <Route path={"/playlist/:id"} component={Playlist}/>
                <Route path={"/artist/:id"} component={Artist}/>
                <Route path={"/recently-played"} component={RecentlyPlayed} />
                <Route path={"/liked-songs"} component={LikedTracks} />
            </Switch>
        </Layout>
    );
};

export default Main;
