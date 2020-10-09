import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

import { loginUser } from '../../redux/user/user.actions';
import { Spinner } from '../../components';

import './style.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(({ User }) => User.loading);
  const [userValues, setUserValues] = useState({
    password: '',
    email: ''
  });

  const handleOnChange = (e) => {
    const newUserValues = {
      ...userValues
    };
    newUserValues[e.target.type] = e.target.value;
    setUserValues(newUserValues);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!userValues.email || !userValues.password) {
      window.alert('Всі поля повинні бути заповнені');
      return;
    }

    dispatch(loginUser(userValues));
  };

  return (
    <div className='login-page'>
      <h2 className='login-page__title'>Привіт</h2>
      <Form className='login-page__form' onSubmit={handleOnSubmit}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Ел. пошта</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            onChange={handleOnChange}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            onChange={handleOnChange}
          />
        </Form.Group>
        <Button variant='dark' type='submit' disabled={isLoading}>
          {!isLoading ? 'Увійти' : <Spinner />}
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
