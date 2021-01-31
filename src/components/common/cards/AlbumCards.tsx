import React from 'react';
import AlbumCard from '../card/AlbumCard';
import CardsWrapper from "./CardsWrapper";


type PropsType = {
    cards: SpotifyApi.AlbumObjectSimplified[]
    isLoading?: boolean
}

const AlbumCards:React.FC<PropsType> = ({cards, isLoading = false}) => {
    return (
        <CardsWrapper isLoading={isLoading}>
            {cards.map((album) =>(
                <AlbumCard
                    key={album.id}
                    name={album.name}
                    artists={album.artists}
                    imageUrl={album.images[0].url}
                    albumId={album.id}/>
                    ))}
        </CardsWrapper>
    );
};

export default AlbumCards;
