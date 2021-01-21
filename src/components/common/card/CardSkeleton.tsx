import React from 'react';
import classes from "./CardSkeleton.module.scss";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
    return (
        <div className={classes.skeletonCard}>
            <Skeleton className={classes.skeletonImage}/>
            <Skeleton className={classes.skeletonTitle}/>
            <Skeleton circle={true}/>
        </div>
    );
};

export default CardSkeleton;
