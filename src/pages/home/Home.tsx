import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import { getMyInfo } from '../../store/home-reducer';

const Home:React.FC = ({}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getMyInfo())
    },[])

        //
        // spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
        //     function (data) {
        //         console.log('Artist albums', data);
        //     },
        //     function (err) {
        //         console.error(err);
        //     }
        // );

    return (
        <div>
            Home
        </div>
    );
};

export default Home;
