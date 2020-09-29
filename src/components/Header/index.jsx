import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from 'react-bootstrap';

import { logoutUser } from '../../redux/user/user.actions';
import './style.scss';

const Header = ({ setLeftBarVisibility, leftBarVisibility }) => {
  const { isAuth, userName, location } = useSelector(({ User, router }) => ({
    isAuth: User.isAuth,
    userName: User.userName,
    location: router.location.pathname
  }));
  const dispatch = useDispatch();

  const onLogOut = () =>
    window.confirm('Дійсно бажаєте вийти?') && dispatch(logoutUser());

  return (
    <Navbar bg='dark' variant='dark'>
      <div
        className={`burger ${leftBarVisibility && 'burger_reversed'}`}
        onClick={() => setLeftBarVisibility(!leftBarVisibility)}
      >
        <span />
        <span />
        <span />
      </div>

      <Link to={isAuth ? '/' : '/login'}>
        <Navbar.Brand>Trendy IT</Navbar.Brand>
      </Link>
      <div className='italy-flag'>
        <span />
        <span />
        <span />
      </div>
      <div className='to-settings'>
        {userName && (
          <span
            className={`nav-item navbar-text ${
              location === '/settings' && 'active'
            }`}
          >
            <Link to={'/settings'}>{userName}</Link>
          </span>
        )}
        {isAuth && (
          <span className='nav-item' onClick={onLogOut}>
            Вийти
          </span>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
