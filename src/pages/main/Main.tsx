import React, {lazy, Suspense, useEffect} from 'react';
import {useDispatch} from "react-redux";
import { getMyInfo } from '../../store/home-reducer';
import Layout from "../../components/layout/Layout";
import {Route, Switch } from 'react-router-dom';
import AlbumContainer from "./album/AlbumContainer";
import PlaylistContainer from "./playlist/PlaylistContainer";
import HomeContainer from "./home/HomeContainer";

const ArtistContainer = lazy(() => import('./artist/ArtistContainer'));
const MyTopArtists = lazy(() => import('./yourLibrary/myTopArtists/MyTopArtists'));
const LikedTracks = lazy(() => import('./yourLibrary/likedTracks/LikedTracks'));
const RecentlyPlayed = lazy(() => import('./yourLibrary/recentlyPlayed/RecentlyPlayed'));


const Main:React.FC = () => {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getMyInfo())
    },[dispatch])



    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path={"/"} exact component={HomeContainer}/>
                    <Route path={"/album/:id"} component={AlbumContainer}/>
                    <Route path={"/playlist/:id"} component={PlaylistContainer}/>
                    <Route path={"/artist/:id"} component={ArtistContainer}/>
                    <Route path={"/recently-played"} component={RecentlyPlayed} />
                    <Route path={"/liked-songs"} component={LikedTracks} />
                    <Route path={"/artists"} component={MyTopArtists} />
                </Switch>
            </Suspense>
        </Layout>
    );
};

export default Main;
