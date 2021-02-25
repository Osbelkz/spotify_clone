import React, {useEffect} from 'react';
import Browse from "./Browse";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../store/store";
import {getCategories} from "../../../store/browse-reducer";

const BrowseContainer = () => {

    const dispatch = useDispatch()
    const categories = useSelector<AppRootStateType, SpotifyApi.CategoryObject[]>(state => state.browse.categories)


    useEffect(() => {
        dispatch(getCategories())
    },[])

    return (
        <Browse categories={categories}/>
    );
};

export default BrowseContainer;
