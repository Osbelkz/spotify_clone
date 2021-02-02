import React from 'react';
import AlbumCard from '../card/AlbumCard';
import CardsWrapper from "./CardsWrapper";


type PropsType = {
    cards: SpotifyApi.AlbumObjectSimplified[]
    isLoading?: boolean
}

const AlbumCards:React.FC<PropsType> = React.memo(({cards, isLoading = false}) => {
    return (
        <CardsWrapper isLoading={isLoading}>
            {cards.map((album) =>(
                <AlbumCard
                    key={album.id}
                    name={album.name}
                    artists={album.artists}
                    imageUrl={album.images[1].url}
                    albumId={album.id}/>
                    ))}
        </CardsWrapper>
    );
});

export default AlbumCards;
