import React from "react";
import {useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";

import {
    LoginPage,
    OrdersPage,
    OrderRedactor,
    ProductsPage,
    ProductRedactor,
    BannersPage,
    MenuPage,
    SettingsPage,
} from "../pages";
import {LeftBar} from "../components";

const Routes = () => {
    const {isAuth, location} = useSelector(({User, router}) => ({
        isAuth: User.isAuth,
        location: router.location.pathname
    }))

    if (!isAuth) {
        return (
            <Switch>
                <Route exact path='/login' component={LoginPage}/>
            </Switch>
        )
    }

    return (
        <div className='body'>
            {location !== '/' && <LeftBar/>}
            <Switch>
                <Route exact path='/' component={MenuPage}/>

                <Route exact path='/products' component={ProductsPage}/>
                <Route exact path='/products/create' component={ProductRedactor}/>
                <Route exact path='/products/:id' render={({match}) => (
                    <ProductRedactor id={match.params.id} editMode />
                )}/>

                <Route exact path='/orders' component={OrdersPage}/>
                <Route exact path='/orders/:id' render={({match}) => (
                    <OrderRedactor id={match.params.id} />
                )}/>

                <Route exact path='/banners' component={BannersPage}/>
                <Route exact path='/settings' component={SettingsPage}/>
            </Switch>
        </div>
    )
}

export default Routes;
