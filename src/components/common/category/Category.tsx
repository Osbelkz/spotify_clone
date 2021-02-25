import React from 'react';
import ArtistCard from "../card/ArtistCard";


type PropsType = {
    category: SpotifyApi.CategoryObject
}

const Category: React.FC<PropsType> = ({category}) => {
    return (
        <ArtistCard imageUrl={category.icons[0].url} name={category.name} link={category.href} />
        // <Card imageSrc={category.icons[0].url} link={category.href} name={category.name}/>
        // <div className={classes.category}>
        //     <Image src={category.icons[0].url}/>
        // </div>
    );
};

export default Category;
