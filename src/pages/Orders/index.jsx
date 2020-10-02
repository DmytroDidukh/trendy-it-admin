import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { getOrders, showLoading } from '../../redux/order/order.actions';
import { FilterButtons, Pagination } from '../../components';
import OrdersList from './OrdersList';
import { ORDER_STATUSES } from '../../config';

import './style.scss';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { isLoading, orders } = useSelector(({ Orders }) => ({
    isLoading: Orders.loading,
    orders: Orders.list
  }));

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const [filter, setFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const onSelectOrder = (item) => {
    dispatch(showLoading());
    dispatch(push(`/orders/${item.id}`));
  };

  const onFilterChange = (e) => {
    e.target.innerText === 'Всі'
      ? setFilter(false)
      : setFilter(e.target.dataset.status);
    setCurrentPage(0);
  };

  const orderFilter = () => {
    return filter ? orders.filter((order) => order.status === filter) : orders;
  };

  const setOrdersToShow = (lengthIndex) => {
    const orders = orderFilter();
    const isEnoughOrders = orders.length >= 20;

    return isEnoughOrders
      ? [...orders].reverse().slice(lengthIndex, lengthIndex + 20)
      : [...orders].reverse().slice(0, 20);
  };

  return (
    <div className='page-container'>
      <div className='page-list'>
        <FilterButtons
          onChange={onFilterChange}
          items={Object.values(ORDER_STATUSES)}
        />
        <OrdersList
          items={setOrdersToShow(currentPage)}
          isLoading={isLoading}
          onSelectItem={onSelectOrder}
        />
        {!!setOrdersToShow(currentPage).length && (
          <Pagination
            itemsFilter={orderFilter}
            setItemsToShow={setOrdersToShow}
            setCurrentPage={setCurrentPage}
            paginationLength={20}
          />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
