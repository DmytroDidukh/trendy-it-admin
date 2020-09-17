import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import orderBy from 'lodash/orderBy';

import {Spinner} from '../';

import './style.scss';

const List = ({ items, isLoading, onEditItem, onDeleteItem }) => {

    const ItemContent = ({ item }) => {
        const { name} = item;

        return (
            <div className='list-item-content'>
                <div className='list-item-content-name' >{name || item.title}</div>
                <div className='list-item-content-buttons'>
                    <Button variant="outline-warning" onClick={() => onEditItem(item)}>Редагувати</Button>
                    <Button variant="outline-danger" onClick={() => onDeleteItem(item)}>Видалити</Button>
                </div>
            </div>
        )
    };

    return (
        <div className='list-container'>      {
            isLoading ? <Spinner /> :
                <>
                    <ListGroup>
                        {items.length > 0 ?
                            orderBy(items, ['createdAt'], 'desc').map(item => (
                                <ListGroup.Item
                                    key={item.id}>
                                    <ItemContent item={item} />
                                </ListGroup.Item>))
                            : 'Список порожній'}
                    </ListGroup>
                </>
        }
        </div>
    )
}

export default List
