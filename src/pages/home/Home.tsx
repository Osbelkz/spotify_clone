import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import { getMyInfo } from '../../store/home-reducer';
import Layout from "../../components/layout/Layout";
import {Route, Switch } from 'react-router-dom';
import RecentlyPlayed from "./yourLibrary/recentlyPlayed/RecentlyPlayed";
import LikedTracks from "./yourLibrary/LikedTracks/LikedTracks";

const Home:React.FC = ({}) => {

    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getMyInfo())
    },[])



    return (
        <Layout>
            <Switch>
                <Route path={"/recently-played"} component={RecentlyPlayed} />
                <Route path={"/liked-songs"} component={LikedTracks} />
            </Switch>
        </Layout>
    );
};

export default Home;
