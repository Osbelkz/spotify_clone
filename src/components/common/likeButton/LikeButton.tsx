import React from 'react';
import classes from "./LikeButton.module.scss"

type PropsType = {
    value: boolean
    onChange: (trackId: string, value: boolean, index: number) => void
    trackId: string
    dataIndex: number
}

const LikeButton: React.FC<PropsType> = React.memo(({value, trackId, dataIndex, onChange}) => {

    const onClickHandler = () => {
        onChange(trackId, value, dataIndex)
    }

    return (
        <button className={classes.likeButton} onClick={onClickHandler}>
            {value
                ? <svg
                       width="20"
                       height="18"
                       viewBox="0 0 20 18"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path className={classes.svg}
                        d="M18.381 2.06759C16.1553 -0.801154 11.7697 -0.442704 10 2.62866C8.2303 -0.442705 3.84473 -0.801149 1.61898 2.06759L1.30962 2.46632C-0.572758 4.8925 -0.300968 8.35235 1.93717 10.4548L8.90735 17.0026C9.01152 17.1005 9.12535 17.2075 9.23271 17.2902C9.3562 17.3853 9.52883 17.4954 9.75928 17.5406C9.91824 17.5718 10.0818 17.5718 10.2407 17.5406C10.4712 17.4954 10.6438 17.3853 10.7673 17.2902C10.8747 17.2075 10.9885 17.1005 11.0927 17.0026L18.0628 10.4548C20.301 8.35235 20.5728 4.89249 18.6904 2.46631L18.381 2.06759Z"
                        fill="#0098EE"/>
                </svg>
                : <svg
                       width="20"
                       height="18"
                       viewBox="0 0 20 18"
                       fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path className={classes.svg}
                        d="M17.1959 2.98709C15.5699 0.891343 12.3061 1.24282 11.1635 3.63669C10.6965 4.61527 9.30352 4.61527 8.83647 3.63669C7.69394 1.24282 4.43011 0.891346 2.8041 2.98709L2.49475 3.38581C1.08665 5.2007 1.28996 7.78882 2.96418 9.36157L9.91679 15.8928C9.94789 15.922 9.97526 15.9477 10 15.9708C10.0247 15.9477 10.0521 15.922 10.0832 15.8928L17.0358 9.36157C18.71 7.78882 18.9133 5.2007 17.5052 3.38581L17.1959 2.98709ZM10 2.62866C11.7697 -0.442704 16.1553 -0.801154 18.381 2.06759L18.6904 2.46631C20.5728 4.89249 20.301 8.35235 18.0628 10.4548L11.0927 17.0026C10.9885 17.1005 10.8747 17.2075 10.7673 17.2902C10.6438 17.3853 10.4712 17.4954 10.2407 17.5406C10.0818 17.5718 9.91825 17.5718 9.75929 17.5406C9.52884 17.4954 9.3562 17.3853 9.23272 17.2902C9.12533 17.2075 9.01149 17.1005 8.9073 17.0026L1.93717 10.4548C-0.300968 8.35235 -0.572758 4.8925 1.30962 2.46632L1.61898 2.06759C3.84473 -0.801149 8.2303 -0.442705 10 2.62866Z"
                        fill="#0098EE"
                    />
                </svg>
            }


        </button>
    );
});

export default LikeButton;
