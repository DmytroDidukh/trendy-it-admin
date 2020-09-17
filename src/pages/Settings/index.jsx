import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Form} from "react-bootstrap";

import {updateUserByToken} from "../../redux/user/user.actions";
import {Spinner} from "../../components";
import './style.scss'

const SettingsPage = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector(({User}) => User.loading)
    const [status, setStatus] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [inputValue2, setInputValue2] = useState('');


    const onSaveCategory = (e) => {
        e.preventDefault()
        if (!inputValue ) {
            window.alert('Всі поял повинні бути заповнені')
            return
        }

        if (status === 'password' && inputValue2 !== inputValue) {
             window.alert('Паролі не співпадають')
            return
        }

        dispatch(updateUserByToken({value: inputValue, key: status}))
        onSelectField(e)
    }

    const onSelectField = (e) => {
        setInputValue('')
        setInputValue2('')
        setStatus(e.target.dataset.name || status)
    }

    const ButtonsGroup = () => (
        <div className='setting-buttons'>
            <Button variant="primary" type="submit" disabled={isLoading}>
                {!isLoading ? 'Зберегти' : <Spinner/>}
            </Button>
            <Button variant="dark" onClick={onSelectField}>
                Відмінити
            </Button>
        </div>
    )

    const currentBlock = () => {
        switch (status) {
            case 'name':
                return (
                    <Form className='form' onSubmit={onSaveCategory}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Ім‘я</Form.Label>
                            <Form.Control type="text" placeholder="Введіть нове ім‘я" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                        </Form.Group>
                     <ButtonsGroup/>
                    </Form>
                )
            case 'password':
                return (
                    <Form className={'form'} onSubmit={onSaveCategory}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Введіть новий пароль"
                                          value={inputValue}
                                          onChange={(e) => setInputValue(e.target.value)}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Повторіть пароль</Form.Label>
                            <Form.Control type="password"
                                          placeholder="Повторіть пароль"
                                          value={inputValue2}
                                          onChange={(e) => setInputValue2(e.target.value)}/>
                        </Form.Group>
                        <ButtonsGroup/>
                    </Form>
                )
            case 'email':
                return (
                    <Form className={'form'} onSubmit={onSaveCategory}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Ел. пошта</Form.Label>
                            <Form.Control type="email"
                                          placeholder="Введіть нову ел. пошту"
                                          value={inputValue}
                                          onChange={(e) => setInputValue(e.target.value)}/>
                        </Form.Group>
                        <ButtonsGroup/>
                    </Form>
                )

        }
    }


    return (
        <div className='settings-page'>
            <h2 className='settings-page__title'>Налаштування</h2>
            <Button variant="outline-dark" type="submit" data-name='name' onClick={onSelectField}>
                Змінити ім‘я
            </Button>
            <Button variant="outline-dark" type="submit" data-name='email' onClick={onSelectField}>
                Змінити ел. пошту
            </Button>
            <Button variant="outline-dark" type="submit" data-name='password' onClick={onSelectField}>
                Змінити пароль
            </Button>
        {status && currentBlock()}
        </div>
    )
}

export default SettingsPage;
