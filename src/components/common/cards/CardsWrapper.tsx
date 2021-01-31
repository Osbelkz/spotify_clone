import React from 'react';

import CardSkeleton from "../card/CardSkeleton";
import classes from "./Cards.module.scss";

type PropsType = {
    isLoading?: boolean
}

const CardsWrapper: React.FC<PropsType> = ({isLoading = false, children}) => {

    return (
        <div className={classes.cards}>
            {isLoading
                ? Array(12).fill("1").map((empty, i) => <CardSkeleton key={i}/>)
                : children
            }
        </div>
    );
};

export default CardsWrapper;
