import { all } from 'redux-saga/effects';

import bannerSaga from "./banner/banner.saga";
import productSaga from "./product/product.saga";
import orderSaga from "./order/order.saga";
import userSaga from "./user/user.saga";
import uploadSaga from "./upload/upload.saga";

export default function* rootSaga() {
    yield all([bannerSaga(), productSaga(), orderSaga(), userSaga(), uploadSaga()]);
}
