import React, {useEffect} from 'react';
import './App.css';
import Login from './pages/login/Login';
import queryString from "query-string";
import {useDispatch, useSelector} from "react-redux";
import {getAuthData} from './store/app-reducer';
import {AppRootStateType} from "./store/store";
import {Route, useHistory} from 'react-router-dom';
import Main from "./pages/main/Main";


function App() {

    const dispatch = useDispatch()
    const history = useHistory()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            const windowUrl = window.location.search;
            const {code} = queryString.parse(windowUrl);
            if (code) {
                dispatch(getAuthData(code as string))
                history.replace("")
            }
        }
    }, [])

    return (
        <>
            {isLoggedIn
                ? <Route to={"/"} render={() => <Main/>}/>
                : <Login/>}
        </>
    )
}

export default App;
