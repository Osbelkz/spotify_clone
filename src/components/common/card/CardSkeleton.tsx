import React from 'react';
import classes from "./PlaylistCardSkeleton.module.scss";
import Skeleton from "react-loading-skeleton";

const PlaylistCardSkeleton = () => {
    return (
        <div className={classes.skeletonCard}>
            <Skeleton className={classes.skeletonImage}/>
            <Skeleton className={classes.skeletonTitle}/>
            <Skeleton circle={true}/>
        </div>
    );
};

export default PlaylistCardSkeleton;
