import React from 'react';
import classes from './Home.module.scss';
import Cards from "../../../components/common/cards/Cards";

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
                    <Cards cards={featuredPlaylists} type={"playlist"} isLoading={isLoading} />
                </div>
            </div>
            <div className={classes.newReleases}>
                <h2 className={classes.title}>New Releases</h2>
                <div>
                    <Cards cards={newReleases} type={"album"} isLoading={isLoading} />
                </div>
            </div>
        </div>

    );
};

export default Home;
