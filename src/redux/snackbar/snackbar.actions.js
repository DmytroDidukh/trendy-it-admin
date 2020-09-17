import {
  SET_SNACKBAR_MESSAGE,
  SET_SNACKBAR_SEVERITY,
  SET_SNACKBAR_VISIBILITY
} from './snackbar.types';

const setSnackbarVisibility = (setSnackbarVisibility) => ({
  type: SET_SNACKBAR_VISIBILITY,
  payload: setSnackbarVisibility
});

const setSnackbarSeverity = (setSnackbarSeverity) => ({
  type: SET_SNACKBAR_SEVERITY,
  payload: setSnackbarSeverity
});

const setSnackbarMessage = (setSnackbarMessage) => ({
  type: SET_SNACKBAR_MESSAGE,
  payload: setSnackbarMessage
});

export {
  setSnackbarVisibility,
  setSnackbarSeverity,
  setSnackbarMessage
};
