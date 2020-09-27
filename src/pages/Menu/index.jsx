import React, {useState} from 'react';
import {Link} from "react-router-dom";

import {MENU_ITEMS} from "../../config";
import './style.scss'

import {useDispatch} from "react-redux";
import {uploadImageToCloud} from "../../redux/upload/upload.actions";

const MenuPage = () => {
    const [base64, setBase64] = useState('')
    const dispatch = useDispatch()

    const onChange = async (e) => {
        const file = e.currentTarget.files[0]

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            dispatch(uploadImageToCloud(reader.result, true))
            setBase64(reader.result)
        }
    }

    const sendFiles = async (e) => {
        e.preventDefault()
        dispatch(uploadImageToCloud(base64))
    }

    return (
        <div className='menu-page'>
            <form onSubmit={sendFiles}>
                <input type="file" onChange={onChange}/>
                <button type={"submit"}>send</button>
            </form>
            <h2 className='menu-page__title'>Menu</h2>
            <div className='menu-page__menu-list'>
                {MENU_ITEMS.map((item, i) => (
                    <Link to={item.link} key={i}>
                        <div className='menu-list__item' style={{backgroundColor: item.color}}>
                            {item.name}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default MenuPage;
