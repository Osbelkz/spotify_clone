import React from 'react';
import {Link} from 'react-router-dom';
import classes from "./Card.module.scss";
import Image from "../image/Image";

type PropsType = {
    imageSrc: string,
    link: string,
    name: string,
}

const Card: React.FC<PropsType> = React.memo(({link, name, imageSrc, children}) => {

    return (
        <div className={classes.card}>
            <Link to={{pathname: link}}>
                <div className={classes.imageWrapper}>
                    <Image className={classes.hover}
                         src={imageSrc} alt={name}/>
                </div>
            </Link>

            <p className={classes.name}>{name}</p>
            <p className={classes.description}>
                {children}
            </p>
        </div>
    );
});

export default Card;
