import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {getArtist} from "../../../store/artist-reducer";
import {useParams} from "react-router-dom";
import classes from './Artist.module.scss';
import Skeleton from "react-loading-skeleton";

const Artist = () => {

    const dispatch = useDispatch()
    let {id} = useParams<{id: string}>()
    const [isLoaded, setIsLoaded] = useState(false)

    const artist = useSelector<AppRootStateType, SpotifyApi.SingleArtistResponse | null>(state => state.artist.artist)
    const popularTracks = useSelector<AppRootStateType, SpotifyApi.TrackObjectFull[] | null>(state => state.artist.popularTracks)

    console.log("artist", artist)
    console.log("artist popular tracks ", popularTracks)

    useEffect(() => {
        dispatch(getArtist({id}))
    }, [id])

    return (
        <div className={classes.artist}>
            <header className={classes.banner}>
                <div className={classes.profile}>
                    <div className={classes.profileRow}>
                        <img className={classes.mainImage}
                             src={artist?.images[1].url}
                             style={{display: isLoaded ? "block" : "none"}}
                             onLoad={() => setIsLoaded(true)}
                             alt=""/>
                        {!isLoaded && <Skeleton
                            circle={true}
                            width={"13.2rem"}
                            height={"13.2rem"}/>}
                        <div className={classes.info}>
                            <p className={classes.title}>Artist</p>
                            <p className={classes.name}>{artist?.name}</p>
                            <div className={classes.buttons}>
                                <button>Play</button>
                                <button>following</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.followers}>
                        <span className={classes.text}>Followers</span>
                        <span className={classes.text}>{artist?.followers.total}</span>
                    </div>
                </div>

                <div className={classes.nav}></div>
            </header>

        </div>
    );
};

export default Artist;
