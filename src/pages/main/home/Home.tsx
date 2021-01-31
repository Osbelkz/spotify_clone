import React from 'react';
import classes from './Home.module.scss';
import PlaylistCards from "../../../components/common/cards/PlaylistCards";
import AlbumCards from "../../../components/common/cards/AlbumCards";

type PropsType = {
    featuredPlaylists: SpotifyApi.PlaylistObjectSimplified[]
    newReleases: SpotifyApi.AlbumObjectSimplified[]
    isLoading: boolean
}

const Home: React.FC<PropsType> = ({newReleases, featuredPlaylists, isLoading}) => {


    return (
        <div className={classes.home}>
            <div className={classes.featuredPlaylists}>
                <h2 className={classes.title}>Featured Playlists</h2>
                <div>
                    <PlaylistCards cards={featuredPlaylists} isLoading={isLoading} />
                </div>
            </div>
            <div className={classes.newReleases}>
                <h2 className={classes.title}>New Releases</h2>
                <div>
                    <AlbumCards cards={newReleases} isLoading={isLoading} />
                </div>
            </div>
        </div>

    );
};

export default Home;
