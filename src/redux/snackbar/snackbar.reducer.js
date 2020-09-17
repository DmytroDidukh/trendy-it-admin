import {
    SET_SNACKBAR_MESSAGE,
    SET_SNACKBAR_SEVERITY,
    SET_SNACKBAR_VISIBILITY
} from './snackbar.types';

const initialState = {
    snackbarVisibility: false,
    snackbarSeverity: '',
    snackbarMessage: ''
};

const snackbarReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SET_SNACKBAR_SEVERITY:
            return {
                ...state,
                snackbarSeverity: payload
            };
        case SET_SNACKBAR_MESSAGE:
            return {
                ...state,
                snackbarMessage: payload
            };
        case SET_SNACKBAR_VISIBILITY:
            return {
                ...state,
                snackbarVisibility: payload
            };
        default:
            return state;
    }
};

export default snackbarReducer;
