import React from 'react';
import classes from "./Preloader.module.scss";

const Preloader = () => {
    return (
        <div  className={classes.preloader}>
            <div className={classes.skDoubleBounce}>
                <div className={`${classes.skChild}`}/>
                <div className={`${classes.skChild} ${classes.skDoubleBounce2}`}/>
            </div>
        </div>
    );
};

export default Preloader;
