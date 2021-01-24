import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import { getMyInfo } from '../../store/home-reducer';
import Layout from "../../components/layout/Layout";
import {Route, Switch } from 'react-router-dom';
import RecentlyPlayed from "./yourLibrary/recentlyPlayed/RecentlyPlayed";
import LikedTracks from "./yourLibrary/LikedTracks/LikedTracks";
import ArtistContainer from "./artist/ArtistContainer";
import AlbumContainer from "./album/AlbumContainer";
import PlaylistContainer from "./playlist/PlaylistContainer";
import HomeContainer from "./home/HomeContainer";

const Main:React.FC = ({}) => {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getMyInfo())
    },[])



    return (
        <Layout>
            <Switch>
                <Route path={"/"} exact component={HomeContainer}/>
                <Route path={"/album/:id"} component={AlbumContainer}/>
                <Route path={"/playlist/:id"} component={PlaylistContainer}/>
                <Route path={"/artist/:id"} component={ArtistContainer}/>
                <Route path={"/recently-played"} component={RecentlyPlayed} />
                <Route path={"/liked-songs"} component={LikedTracks} />
            </Switch>
        </Layout>
    );
};

export default Main;
