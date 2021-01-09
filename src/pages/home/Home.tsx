import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getMyInfo, HomeStateType } from '../../store/home-reducer';
import {AppRootStateType} from "../../store/store";
import Layout from "../../components/layout/Layout";

const Home:React.FC = ({}) => {

    const dispatch = useDispatch()
    const {displayName, MyRecentlyPlayedTracks} = useSelector<AppRootStateType, HomeStateType>(state => state.home)

    console.log(MyRecentlyPlayedTracks)

    useEffect(() => {
        dispatch(getMyInfo())
    },[])



    return (
        <Layout>


            {displayName}
            <div>
                {MyRecentlyPlayedTracks.map((track: any) => {
                    return <div>
                        <img src={track.track.album.images[1].url} alt=""/>
                        {track.track.name}
                    </div>
                })}
            </div>
        </Layout>
    );
};

export default Home;
