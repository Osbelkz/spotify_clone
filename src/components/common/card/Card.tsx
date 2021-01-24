import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import classes from "./Card.module.scss";

type PropsType = {
    imageSrc: string,
    link: string,
    name: string,
    description: string | JSX.Element | null
}

const Card: React.FC<PropsType> = ({link, name, description, imageSrc}) => {

    let [imageLoadComplete, setImageLoadComplete] = useState(false)


    return (
        <div className={classes.card}>
            <Link to={{pathname: link}}>
                <div className={classes.imageWrapper}>
                    <img className={classes.hover}
                         style={{opacity: imageLoadComplete ? "1" : "0"}}
                         onLoad={() => setImageLoadComplete(true)}
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
