import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../redux/root.reducer';
import rootSaga from '../redux/root.saga';

export const history = createBrowserHistory();

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer(history),
        compose(
            applyMiddleware(routerMiddleware(history), sagaMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;
