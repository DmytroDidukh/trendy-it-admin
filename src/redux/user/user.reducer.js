import {
    SET_AUTH,
    LOGOUT_USER,
    SET_AUTH_ERROR,
    SET_LOADING,
} from './user.types'

const initialState = {
    isAuth: null,
    userName: null,
    error: null,
    loading: false,
}

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_AUTH:
            return {
                ...state,
                isAuth: payload.auth,
                userName: payload.userName,
            };
        case LOGOUT_USER:
            return {
               ...initialState
            };
        case SET_AUTH_ERROR:
            return {
                ...state,
                error: payload
            };
        case SET_LOADING: {
            return {
                ...state,
                loading: payload,
            }
        }
        default:
            return state
    }
}

export default userReducer;
