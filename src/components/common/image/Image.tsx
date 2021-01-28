import React, {useState} from 'react';


interface PropsType extends  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>{

}

const Image: React.FC<PropsType> = React.memo((props) => {

    let [imageLoaded, setImageLoaded] = useState(false)

    return (
        <img {...props} onLoad={() => setImageLoaded(true)}
            style={{
                opacity: imageLoaded ? 1 : 0,
                transition: "all .3s ease-out"
            }}
        />

    );
})

export default Image;
