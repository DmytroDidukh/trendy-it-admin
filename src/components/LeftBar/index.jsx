import React from 'react';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';

import { MENU_ITEMS } from '../../config';

import './style.scss';

const LeftBar = ({ leftBarVisibility, setLeftBarVisibility }) => {
  const { location } = useSelector(({ router }) => ({
    location: router.location.pathname
  }));

  return (
    <div className={`left-bar ${leftBarVisibility && 'left-bar_visible'}`}>
      {MENU_ITEMS.map(
        (item, i) =>
          i !== 3 && (
            <Navbar.Text
              className={`left-bar__item ${
                location.includes(item.id) && 'active'
              }`}
              key={item.link}
            >
              <Link
                onClick={() => setLeftBarVisibility(false)}
                to={`${item.link}`}
              >
                <Icon name={item.icon} />
                {item.name}
              </Link>
            </Navbar.Text>
          )
      )}
    </div>
  );
};

export default LeftBar;
