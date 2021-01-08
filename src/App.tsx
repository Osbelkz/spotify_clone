import React, {useEffect} from 'react';
import './App.css';
import Login from './pages/login/Login';
import queryString from "query-string";
import {useDispatch, useSelector} from "react-redux";
import {tokenDataType, setAccessToken} from './store/app-reducer';
import {AppRootStateType} from "./store/store";
import {Route, Switch} from 'react-router-dom';
import Home from "./pages/home/Home";


function App() {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.app.isLoggedIn)

    useEffect(() => {
        if (!isLoggedIn) {
            const windowUrl = window.location.hash;
            if (windowUrl) {
                const params = queryString.parse(windowUrl) as tokenDataType;
                dispatch(setAccessToken(params))
                window.location.hash = ""
            }
        }
    })

    return (
        <>
            {isLoggedIn
                ? <Switch>
                    <Route to={"/"} render={() => <Home/>}/>
                </Switch>
                : <Login/>}
        </>
    )
}

export default App;
