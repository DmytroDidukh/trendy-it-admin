import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ConnectedRouter} from "connected-react-router";

import {Header} from "../index";
import Routes from "../../routes";
import {getBanners} from "../../redux/banner/banner.actions";
import {getProducts} from "../../redux/product/product.actions";
import {getOrders} from "../../redux/order/order.actions";
import {checkUserByToken} from "../../redux/user/user.actions";
import Snackbar from "../Snackbar";
import {history} from "../../store/store";

import 'semantic-ui-css/semantic.min.css'
import './style.scss';

const App = () => {
    const isAuth = useSelector(({User}) => User.isAuth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserByToken());

        if (isAuth) {
            dispatch(getBanners());
            dispatch(getProducts());
            dispatch(getOrders());
        }
    }, [dispatch, isAuth])

    return (
        <ConnectedRouter history={history}>
            <Header/>
            <Routes/>
            <Snackbar/>
        </ConnectedRouter>
    )
}

export default App
