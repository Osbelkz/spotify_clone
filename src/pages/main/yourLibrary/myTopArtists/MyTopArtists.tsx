import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../store/store";
import {getMyTopArtists} from "../../../../store/myLibrary-reducer";
import ArtistCard from '../../../../components/common/card/ArtistCard';
import classes from "./MyTopArtists.module.scss";

const MyTopArtists = () => {

    const dispatch = useDispatch()
    const myTopArtists = useSelector<AppRootStateType, SpotifyApi.ArtistObjectFull[]>(state => state.myLibrary.myTopArtists)

    useEffect(() => {
        dispatch(getMyTopArtists())
    }, [dispatch])


    return (
        <div className={classes.myTopArtists}>
            <h1 className={classes.title}>Artists</h1>
            <div className={classes.artistsCards}>
                {myTopArtists.map(artist => (
                    <ArtistCard
                        key={artist.id}
                        imageUrl={artist.images[1].url}
                        link={artist.id}
                        name={artist.name}
                    />
                ))}
            </div>
        </div>
    );
};

export default MyTopArtists;
