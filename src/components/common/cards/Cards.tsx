import React from 'react';
import PlaylistCard from "../playlistCard/PlaylistCard";
import AlbumCard from "../albumCard/AlbumCard";
import CardSkeleton from "../card/CardSkeleton";
import classes from "./Cards.module.scss";

type PropsType = {
    cards: (SpotifyApi.PlaylistObjectSimplified | SpotifyApi.AlbumObjectSimplified)[]
    isLoading?: boolean
    type: "album" | "playlist"
}

const Cards: React.FC<PropsType> = ({cards, type, isLoading = false}) => {

    return (
        <div className={classes.cards}>
            {isLoading
                ? Array(12).fill("1").map((empty, i) => <CardSkeleton key={i}/>)
                : type === "album"
                    ? cards.map((card) => <AlbumCard key={card.id} album={card as SpotifyApi.AlbumObjectSimplified}/>)
                    : cards.map((card) => <PlaylistCard key={card.id} playlist={card as SpotifyApi.PlaylistObjectSimplified}/>)
            }
        </div>
    );
};

export default Cards;
