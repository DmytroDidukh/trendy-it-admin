import React from "react";
import {Button} from "react-bootstrap";

import './style.scss'

const RedactorButtons = ({onSaveProduct, onResetInputs}) => {

    const onCancel = () => {
        if (window.confirm('Скасувати зміни?')) {
            onResetInputs()
        }
    }


    return (
        <div className='redactor-buttons'>
            <Button variant="primary" onClick={onSaveProduct}>
                Зберегти
            </Button>
            <Button variant="outline-dark" onClick={onCancel}>
                Назад
            </Button>
        </div>
    )
}

export default RedactorButtons
