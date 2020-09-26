import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ConnectedRouter} from "connected-react-router";

import {Header} from "../index";
import Routes from "../../routes";
import {checkUserByToken} from "../../redux/user/user.actions";
import Snackbar from "../Snackbar";
import {history} from "../../store/store";

import 'semantic-ui-css/semantic.min.css'
import './style.scss';

const App = () => {
    const isAuth = useSelector(({User}) => User.isAuth)
    const dispatch = useDispatch();

    const [leftBarVisibility, setLeftBarVisibility] = useState(window.innerWidth > 768)

    useEffect(() => {
        dispatch(checkUserByToken());
    }, [dispatch, isAuth])

    return (
        <ConnectedRouter history={history}>
            <Header
                leftBarVisibility={leftBarVisibility}
                setLeftBarVisibility={setLeftBarVisibility}
            />
            <Routes
                leftBarVisibility={leftBarVisibility}
                setLeftBarVisibility={setLeftBarVisibility}
            />
            <Snackbar/>
        </ConnectedRouter>
    )
}

export default App
