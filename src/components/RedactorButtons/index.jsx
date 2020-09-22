import React from "react";
import {Button} from "react-bootstrap";

import './style.scss'

const RedactorButtons = ({onSaveProduct, onResetInputs, setShowRedactor}) => {

    const onCancel = () => {
        if (window.confirm('Скасувати зміни?')) {
            onResetInputs()
            setShowRedactor(null)
        }
    }


    return (
        <div className='redactor-buttons'>
            <Button variant="primary" onClick={onSaveProduct}>
                Зберегти
            </Button>
            <Button variant="outline-dark" onClick={onCancel}>
                Відмінити
            </Button>
        </div>
    )
}

export default RedactorButtons
