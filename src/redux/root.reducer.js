import {combineReducers} from 'redux';
import {connectRouter} from "connected-react-router";

import Banners from './banner/banner.reducer'
import Products from './product/product.reducer'
import Orders from './order/order.reducer'
import User from './user/user.reducer'
import Upload from './upload/upload.reducer'
import Snackbar from './snackbar/snackbar.reducer'

const rootReducer = (history) =>
    combineReducers({
        Banners,
        Snackbar,
        Products,
        Orders,
        User,
        Upload,
        router: connectRouter(history)
    });

export default rootReducer;
