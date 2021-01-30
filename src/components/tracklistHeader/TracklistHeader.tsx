import React from 'react';
import classes from "./TracklistHeader.module.scss";
import Image from "../common/image/Image";
import {Button} from "../common/button/Button";


type PropsType = {
    imageUrl: string
    name: string
    type: string
    followers?: number
    setPlayerQueueHandler: () => void
}

const TracklistHeader: React.FC<PropsType> = React.memo(({imageUrl, type, name, followers, setPlayerQueueHandler, children}) => {

    return (
        <header className={classes.banner}>
            <div className={classes.profile}>
                <div className={classes.profileRow}>
                    <Image className={classes.mainImage}
                           src={imageUrl}
                           alt=""/>
                    <div className={classes.info}>
                        <p className={classes.title}>{type}</p>
                        <h1 className={classes.name}>{name}</h1>
                        <p className={classes.description}>{children}</p>
                        <div className={classes.buttons}>
                            <Button btnType={"green"} onClick={setPlayerQueueHandler}>Play</Button>
                            <Button>follow</Button>
                        </div>
                    </div>

                </div>
                {followers && <div className={classes.followers}>
                    <span className={classes.text}>Followers</span>
                    <span className={classes.text}>{followers}</span>
                </div>}

            </div>
        </header>
    );
});

export default TracklistHeader;
