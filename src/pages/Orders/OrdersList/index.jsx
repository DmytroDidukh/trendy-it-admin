import React from 'react'
import {ListGroup} from 'react-bootstrap'
import orderBy from 'lodash/orderBy';

import {Spinner, Time} from '../../../components';
import {orderSumCounter, orderStatusVariant} from "../../../utils";

import './style.scss';

const OrdersList = ({items, isLoading, onSelectItem}) => {

    const ItemContent = ({item, index}) => {
        const {customer, createdAt, products} = item;
        const totalSum = orderSumCounter(products)

        return (
            <div className='list-item-content'>
                <div className='list-item-content__index'>{index + 1}.</div>
                <div className='list-item-content__name'>{customer.name} {customer.surname}</div>
                <div className='list-item-content__sum'>{totalSum} UAH</div>
                <Time date={createdAt}/>
            </div>
        )
    };

    return (
        <div className='list-container'>      {
            isLoading ? <Spinner/> :
                <>
                    <ListGroup>
                        {items.length > 0 ?
                            orderBy(items, ['createdAt'], 'desc').map((item, index) => (
                                <ListGroup.Item
                                    key={item.id}
                                    action variant={orderStatusVariant(item.status)}
                                    onClick={() => onSelectItem(item)}
                                >
                                    <ItemContent item={item} index={index}/>
                                </ListGroup.Item>))
                            : 'Список порожній'}
                    </ListGroup>
                </>
        }
        </div>
    )
}

export default OrdersList
