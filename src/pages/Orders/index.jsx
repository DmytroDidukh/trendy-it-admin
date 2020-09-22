import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

import {getOrders, setOrder} from "../../redux/order/order.actions";
import {ButtonsGroup, Pagination} from "../../components";
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
    const [currentPage, setCurrentPage] = useState(0);

    const onSelectPurchase = (item) => {
        dispatch(setOrder(item));
        setShowRedactor(true)
        window.innerWidth <= 1100 && window.scroll(0, 700)
    }

    const onFilterChange = (e) => {
        e.target.innerText === 'Всі' ? setFilter(false) : setFilter(e.target.dataset.status);
        setCurrentPage(0)
    }

    const orderFilter = () => {
        return filter ? orders.filter(order => order.status === filter) : orders
    }

    const setOrdersToShow = (lengthIndex) => {
        const orders = orderFilter()
        const isEnoughOrders = orders.length>= 20

        return isEnoughOrders ? [...orders].reverse().slice(lengthIndex, lengthIndex + 20) : [...orders].reverse().slice(0, 20)
    }

    return (
        <div className='page-container'>
            <div className='page-list'>
                <ButtonsGroup onChange={onFilterChange} items={Object.values(ORDER_STATUSES)} />
                <OrdersList
                    items={setOrdersToShow(currentPage)}
                    isLoading={isLoading}
                    onSelectItem={onSelectPurchase}
                />
                {!!setOrdersToShow(currentPage).length && <Pagination
                    itemsFilter={orderFilter}
                    setItemsToShow={setOrdersToShow}
                    setCurrentPage={setCurrentPage}
                    paginationLength={20}
                />}
            </div>
            <div className='page-container__item'>
                {
                    showRedactor ? <OrderRedactor setRedactorState={setShowRedactor}/> :
                    <div className='page-item-message'>Натисніть на замовлення, щоб отримати детальнішу інформацію</div>
                }
            </div>
        </div>
    )
}

export default OrdersPage
