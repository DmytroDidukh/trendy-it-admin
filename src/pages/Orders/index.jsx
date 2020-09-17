import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {getOrders, setOrder} from "../../redux/order/order.actions";
import {ButtonsGroup} from "../../components";
import OrderRedactor from './OrderRedactor'
import OrdersList from './OrdersList'
import {ORDER_STATUSES} from "../../config";

import './style.scss'

const OrdersPage = () => {
    const dispatch = useDispatch();
    const { isLoading, orders } = useSelector(({ Orders }) => ({
        isLoading: Orders.loading,
        orders: Orders.list
    }))

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch])

    const [showRedactor, setShowRedactor] = useState(false);
    const [filter, setFilter] = useState(false);

    const onSelectPurchase = (item) => {
        dispatch(setOrder(item));
        setShowRedactor(true)
    }

    const onFilterChange = (e) => {
        e.target.innerText === 'Всі' ? setFilter(false) : setFilter(e.target.dataset.status);
    }

    return (
        <div className='page-container'>
            <div className='page-list'>
                <ButtonsGroup onChange={onFilterChange} items={Object.values(ORDER_STATUSES)} />
                <OrdersList
                    items={filter ? orders.filter(order => order.status === filter) : orders}
                    isLoading={isLoading}
                    onSelectItem={onSelectPurchase}
                />
            </div>
            <div className='page-item'>
                {
                    showRedactor ? <OrderRedactor setRedactorState={setShowRedactor}/> :
                    <div className='page-item-message'>Натисніть на замовлення, щоб отримати детальнішу інформацію</div>
                }
            </div>
        </div>
    )
}

export default OrdersPage
