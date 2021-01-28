import React from 'react';
import {Link} from 'react-router-dom';
import classes from "./Card.module.scss";
import Image from "../image/Image";

type PropsType = {
    imageSrc: string,
    link: string,
    name: string,
    description: string | JSX.Element | null
}

const Card: React.FC<PropsType> = ({link, name, description, imageSrc}) => {

    return (
        <div className={classes.card}>
            <Link to={{pathname: link}}>
                <div className={classes.imageWrapper}>
                    <Image className={classes.hover}
                         src={imageSrc} alt=""/>
                </div>
            </Link>

            <p className={classes.name}>{name}</p>
            <p className={classes.description}>
                {description}
            </p>
        </div>
    );
};

export default Card;
