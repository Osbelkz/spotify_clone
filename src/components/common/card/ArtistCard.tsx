import React from 'react';
import Image from "../image/Image";
import classes from "./ArtistCard.module.scss";
import {Link} from "react-router-dom";

type PropsType = {
    imageUrl: string
    name: string
    link: string
}

const ArtistCard: React.FC<PropsType> = React.memo(({imageUrl, link, name}) => {
    return (
        <div className={classes.artistCard}>
            <div className={classes.imageWrapper}>
                <Link to={{pathname: "artist/" + link}}>
                    <Image className={classes.artistImage}
                           src={imageUrl} alt={name}/>
                </Link>
            </div>
            <p className={classes.name}>{name}</p>
        </div>
    );
});

export default ArtistCard;
