import React from 'react';
import PlaylistCard from "../playlistCard/PlaylistCard";


type PropsType = {
    cards: SpotifyApi.PlaylistObjectSimplified[]
}

const Cards: React.FC<PropsType> = ({cards}) => {
    return (
        <div>
            {cards.map(card => <PlaylistCard playlist={card}/>)}
        </div>
    );
};

export default Cards;
