import React from 'react';
import Card from "./Card";

type PropsType = {
    name: string
    playlistId: string
    description: string | null
    imageUrl: string
}

const PlaylistCard: React.FC<PropsType> = ({name, imageUrl, playlistId, description}) => {

    const onClickPath = `playlist/${playlistId}`

    return (
        <Card name={name}
              imageSrc={imageUrl}
              link={onClickPath}>
            {description}
        </Card>

    );
};

export default PlaylistCard;
