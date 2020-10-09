import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { getOrders, showLoading } from '../../redux/order/order.actions';
import { FilterButtons, Pagination } from '../../components';
import OrdersList from './OrdersList';
import { ORDER_STATUSES, PRODUCT_FILTER_OPTIONS } from '../../config';

import './style.scss';

const OrdersPage = ({ page }) => {
  const dispatch = useDispatch();
  const { loading, orders, pagination } = useSelector(({ Orders }) => ({
    loading: Orders.loading,
    orders: Orders.list,
    pagination: Orders.pagination
  }));

  const [query, setQuery] = useState({
    filter: {},
    sort: '-createdAt',
    page: +page
  });

  useEffect(() => {
    dispatch(getOrders(query));
    window.scroll(0, 0);
  }, [query, dispatch]);

  const onSelectOrder = (item) => {
    dispatch(showLoading());
    dispatch(push(`/orders/${item.id}`));
  };

  return (
    <div className='page-container'>
      <div className='page-list'>
        <FilterButtons
          filter={query.filter}
          setQuery={setQuery}
          items={Object.values(ORDER_STATUSES)}
          linkValue='orders'
        />
        <OrdersList
          items={orders}
          loading={loading}
          onSelectItem={onSelectOrder}
        />
        {!!orders.length && (
          <Pagination pagination={pagination} setQuery={setQuery} />
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
