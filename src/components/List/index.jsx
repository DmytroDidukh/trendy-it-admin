import React from 'react'
import {ListGroup, Button} from 'react-bootstrap'
import {Icon, Label} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import orderBy from 'lodash/orderBy';

import {Spinner} from '../';

import './style.scss';

const List = ({items, isLoading, onEditItem, onDeleteItem}) => {

    const ItemContent = ({item}) => {
        const {id, name, images, newItem, sale, hot, available} = item;

        return (
            <div className='list-item-content'>
                { item.__typename === 'Product' &&
                <img className='list-item-content-image'
                    src={images.product[0].link} alt='product'/>}
                <h4 className='list-item-content-name'>{name || item.title}</h4>
                { item.__typename === 'Product' &&
               <div className={"list-item-content-labels"}>
                   {available &&  <Label as='a' color='blue' horizontal>
                       в наявності
                   </Label>}
                   {newItem &&  <Label as='a' color='green' horizontal>
                       новинка
                   </Label>}
                   {sale &&  <Label as='a' color='red' horizontal>
                       розпродаж
                   </Label>}
                   {hot &&  <Label as='a' color='orange' horizontal>
                       хіт продаж
                   </Label>}
               </div>}
                <div className='list-item-content-buttons'>
                    {window.innerWidth > 550 ? (
                        <>

                                <Button variant="outline-warning"
                                       onClick={() => onEditItem(item)}>Редагувати</Button>

                            <Button variant="outline-danger" onClick={() => onDeleteItem(item)}>Видалити</Button>
                        </>
                    ) : (
                        <>
                            <Link to={`/products/${id}`}>
                                <Icon name='edit' onClick={() => onEditItem(item)}/>
                            </Link>
                            <Icon name='delete' onClick={() => onDeleteItem(item)}/>
                        </>
                    )}
                </div>
            </div>
        )
    };

    return (
        <div className='list-container'>      {
            isLoading ? <Spinner/> :
                <>
                    <ListGroup>
                        {items.length > 0 ?
                            orderBy(items, ['createdAt'], 'desc').map(item => (
                                <ListGroup.Item
                                    key={item.id}>
                                    <ItemContent item={item}/>
                                </ListGroup.Item>))
                            : 'Список порожній'}
                    </ListGroup>
                </>
        }
        </div>
    )
}

export default List
