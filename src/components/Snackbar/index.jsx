import React, {useEffect} from "react";
import classNames from 'classnames';
import {useSelector, useDispatch} from "react-redux";

import {setSnackbarVisibility} from "../../redux/snackbar/snackbar.actions";

import './style.scss'

const Snackbar = () => {
    const dispatch = useDispatch();
    const {snackbarVisibility, snackbarSeverity, snackbarMessage} = useSelector(({Snackbar}) => ({
            snackbarVisibility: Snackbar.snackbarVisibility,
            snackbarSeverity: Snackbar.snackbarSeverity === 'success',
            snackbarMessage: Snackbar.snackbarMessage
        })
    );

    useEffect(() => {
        setTimeout(() => {
            dispatch(setSnackbarVisibility(false))
        }, 3000)
    }, [dispatch, snackbarVisibility])

    return (
        <div className={classNames('snackbar', {'active': snackbarVisibility, 'success': snackbarSeverity, 'error': !snackbarSeverity})}>
            <span>{snackbarMessage}</span>
        </div>
    )
}

export default Snackbar;
