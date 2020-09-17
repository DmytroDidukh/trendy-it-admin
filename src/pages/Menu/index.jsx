import React from 'react';
import { Link } from "react-router-dom";

import { MENU_ITEMS } from "../../config";
import './style.scss'

const MenuPage = () => {

    return (
        <div className='menu-page'>
            <h2 className='menu-page__title'>Menu</h2>
            <div className='menu-page__menu-list'>
                {MENU_ITEMS.map((item, i) => (
                    <Link to={item.link} key={i}>
                        <div className='menu-list__item' style={{ backgroundColor: item.color }}>
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MenuPage;
