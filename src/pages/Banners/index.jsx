import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from 'react-bootstrap';

import {List} from '../../components';
import BannerRedactor from './BannersRedactor'
import {
    deleteBanner,
    setBanner,
    getBanners
} from "../../redux/banner/banner.actions";

import './style.scss'

const BannersPage = () => {
    const dispatch = useDispatch();
    const {isLoading, banners} = useSelector(({Banners}) => ({
        isLoading: Banners.loading,
        banners: Banners.list
    }))

    useEffect(() => {
        dispatch(getBanners());
    }, [dispatch])

    const [redactorState, setRedactorState] = useState('');
    const [showRedactor, setShowRedactor] = useState(false);

    const onAddProduct = () => {
        setRedactorState('add')
        setShowRedactor(true);
        dispatch(setBanner(null))
    }

    const onEditProduct = (banner) => {
        setRedactorState('edit')
        setShowRedactor(true);
        dispatch(setBanner(banner))
    }

    const onDeleteProduct = ({id, name}) => {
        window.confirm(`Видалити ${name}?`) && dispatch(deleteBanner(id))
    }

    return (
        <div className='page-container'>
            <div className='page-list'>
                <Button className='list-add-button'
                        variant="primary"
                        onClick={onAddProduct}> Додати +</Button>
                <List
                    items={banners}
                    isLoading={isLoading}
                    onEditItem={onEditProduct}
                    onDeleteItem={onDeleteProduct}
                />
            </div>
            <div className='page-item'>
                {showRedactor ? <BannerRedactor
                        redactorState={redactorState}
                    /> :
                    <div className='page-item-message'>Редагуйте елемет зі списку або добавте новий</div>}

            </div>
        </div>
    )
}

export default BannersPage;
