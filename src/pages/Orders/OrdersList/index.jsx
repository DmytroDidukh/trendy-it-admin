import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { Spinner, Time } from '../../../components';
import { orderSumCounter, orderStatusVariant } from '../../../utils';

import './style.scss';

const OrdersList = ({ items, isLoading, onSelectItem }) => {
  const ItemContent = ({ item, index }) => {
    const { customer, createdAt, products, orderId } = item;
    const totalSum = orderSumCounter(products);

    return (
      <div className='list-item-content'>
        <div className='list-item-content__index'>{index + 1}.</div>
        <div className='list-item-content__orderId'>{orderId}</div>
        <div className='list-item-content__name'>
          {customer.name} {customer.surname}
        </div>
        <div className='list-item-content__sum'>{totalSum}</div>
        <Time date={createdAt} />
      </div>
    );
  };

  return (
    <div className='list-container'>
      {' '}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ListGroup>
            <ListGroup.Item action variant={'light'}>
              <div className='list-item-content'>
                <div className='list-item-content__index'>*</div>
                <div className='list-item-content__orderId'>№</div>
                <div className='list-item-content__name'>Покупець</div>
                <div className='list-item-content__sum'>Сума</div>
                <div className={'date'}> Створено </div>
              </div>
            </ListGroup.Item>
            {items.length > 0
              ? items.map((item, index) => (
                  <ListGroup.Item
                    key={item.id}
                    action
                    variant={orderStatusVariant(item.status)}
                    onClick={() => onSelectItem(item)}
                  >
                    <ItemContent item={item} index={index} />
                  </ListGroup.Item>
                ))
              : 'Список порожній'}
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default OrdersList;
