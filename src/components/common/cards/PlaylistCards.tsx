import React from "react";
import PlaylistCard from "../card/PlaylistCard";
import CardsWrapper from "./CardsWrapper";

type PropsType = {
    cards: SpotifyApi.PlaylistObjectSimplified[]
    isLoading?: boolean
}

const PlaylistCards:React.FC<PropsType> = ({cards, isLoading = false}) => {
    return (
        <CardsWrapper isLoading={isLoading}>
            {cards.map((playlist) => (
                <PlaylistCard key={playlist.id}
                              name={playlist.name}
                              description={playlist.description}
                              imageUrl={playlist.images[0].url}
                              playlistId={playlist.id}/>
                ))})
        </CardsWrapper>
    );
};

export default PlaylistCards;
