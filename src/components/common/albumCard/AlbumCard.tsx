import React from 'react';
import Card from "../card/Card";
import ArtistsLinks from "../artistsLinks/ArtistsLinks";


type PropsType = {
    album: SpotifyApi.AlbumObjectSimplified
}

const AlbumCard: React.FC<PropsType> = ({album}) => {

    const onClickPath =  `/album/${album.id}`
    const description = <ArtistsLinks artists={album.artists}/>
    
    return (
        <Card imageSrc={album.images[0].url} link={onClickPath} name={album.name} description={description} />
    );
};

export default AlbumCard;
