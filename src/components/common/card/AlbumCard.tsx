import React from 'react';
import Card from "./Card";
import ArtistsLinks from "../artistsLinks/ArtistsLinks";


type PropsType = {
    albumId: string
    artists: SpotifyApi.ArtistObjectSimplified[]
    imageUrl: string
    name: string
}

const AlbumCard: React.FC<PropsType> = ({name, imageUrl, artists, albumId}) => {

    const onClickPath =  `/album/${albumId}`
    const artistsLinks = <ArtistsLinks artists={artists}/>

    return (
        <Card imageSrc={imageUrl}
              link={onClickPath}
              name={name}>
            {artistsLinks}
        </Card>
    );
};

export default AlbumCard;
