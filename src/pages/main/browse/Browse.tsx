import React from 'react';
import Category from "../../../components/common/category/Category";
import classes from "./Browse.module.scss";

type PropsType = {
    categories: SpotifyApi.CategoryObject[]
}

const Browse: React.FC<PropsType> = ({categories}) => {



    return (
        <div>
            <div>
                search
                <input type="text"/>
            </div>
            <div className={classes.categories}>
                {categories.map(category => <Category category={category} key={category.id}/>)}
            </div>
        </div>
    );
};

export default Browse;
