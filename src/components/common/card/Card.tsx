import React from 'react';
import {Link} from 'react-router-dom';
import classes from "./Card.module.scss";

type PropsType = {
    imageSrc: string,
    link: string,
    name: string,
    description: string |  JSX.Element | null
}

const Card: React.FC<PropsType> = ({link, name, description, imageSrc}) => {

    return (
        <div className={classes.card}>
            <div>
                <Link to={{pathname: link}}>
                    <img className={classes.hover} src={imageSrc} alt=""/>
                </Link>
            </div>

            <p className={classes.name}>{name}</p>
            <p className={classes.description}>
                {description}
            </p>
        </div>
    );
};

export default Card;
