import React from 'react';
import Card from "../card/Card";

type PropsType = {
    playlist: SpotifyApi.PlaylistObjectSimplified
}

const PlaylistCard: React.FC<PropsType> = ({playlist}) => {

    const onClickPath = `playlist/${playlist.id}`

    return (
        <Card name={playlist.name}
              description={playlist.description}
              imageSrc={playlist.images[0]?.url}
              link={onClickPath}
        />
    );
};

export default PlaylistCard;
