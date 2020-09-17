import React from "react";
import {useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";

import {
    LoginPage,
    OrdersPage,
    ProductsPage,
    BannersPage,
    MenuPage,
    SettingsPage,
} from "../pages";

const Routes = () => {
    const {isAuth} = useSelector(({User, router}) => ({
        isAuth: User.isAuth,
        userName: User.userName,
        location: router.location.pathname,
    }))

    if (!isAuth) {
        return (
            <Switch>
                <Route exact path='/login'component={LoginPage}/>
            </Switch>
    )}

    return (
        <Switch>
            <Route exact path='/' component={MenuPage}/>
            <Route exact path='/products' component={ProductsPage}/>
            <Route exact path='/orders' component={OrdersPage}/>
            <Route exact path='/banners' component={BannersPage}/>
            <Route exact path='/settings' component={SettingsPage}/>
        </Switch>
    )
}

export default Routes;
