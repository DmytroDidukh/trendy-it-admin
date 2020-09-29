import { all } from 'redux-saga/effects';

import bannerSaga from './banner/banner.saga';
import productSaga from './product/product.saga';
import orderSaga from './order/order.saga';
import userSaga from './user/user.saga';
import imagesSaga from './images/images.saga';

export default function* rootSaga() {
  yield all([
    bannerSaga(),
    productSaga(),
    orderSaga(),
    userSaga(),
    imagesSaga()
  ]);
}
