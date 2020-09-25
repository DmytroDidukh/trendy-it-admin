import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table, Button, InputGroup, FormControl, Badge} from 'react-bootstrap';

import {DropdownBar, Time} from '../../../components';
import {deleteOrder, setOrder, updateOrderStatus} from "../../../redux/order/order.actions";
import {orderSumCounter, orderStatusVariant} from "../../../utils";
import {ORDER_STATUSES} from '../../../config'

import './style.scss';

const OrderRedactor = ({setRedactorState}) => {
    const dispatch = useDispatch()
    const order = useSelector(({Orders}) => Orders.order);

    const {customer, delivery, status, createdAt, connectionMethod, products, deliveryPrice, paymentMethod} = order

    const [newStatus, setNewStatus] = useState(null)
    const [dropdownBarValue, setDropdownBarValue] = useState(null)
    const [addressToShow, setAddressToShow] = useState(null)

    useEffect(() => {
        if (delivery.method === "кур‘єром") {
            setAddressToShow(`м. ${delivery.city}, вул. ${delivery.address.street}, ${delivery.address.built} ${delivery.address.apartment ? `, кв. ${delivery.address.apartment}` : ''}`)
        } else if (delivery.method === 'на відділення Нової Пошти') {
            setAddressToShow(`м. ${delivery.city}, відділення. ${delivery.postOffice}`)
        }
    }, [order])


    const onSelectDropdownBarItem = (key, e) => {
        setNewStatus(e.target.dataset.status)
        setDropdownBarValue(e.target.innerText)
    }

    const onChangeStatus = () => {
        if (dropdownBarValue) {
            dispatch(setOrder({...order, status: newStatus}))
            dispatch(updateOrderStatus({id: order.id, status: newStatus}))
            setDropdownBarValue(null)
        } else {
            window.alert('Всі поля повинні бути заповнені!')
        }
    }

    const onDeletePurchase = () => {
        if (window.confirm('Видалити замовлення?')) {
            dispatch(deleteOrder(order.id))
            setRedactorState(false)
        }
    }

    const totalProductSum = orderSumCounter(products)

    return (
        <div className='purchase'>
            <h3 className={'purchase__header'}>Замовлення {order.orderId}</h3>
            <h6>Створено: <Time date={createdAt}/></h6>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                        Покепець:
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                             value={`${customer.name} ${customer.surname}`}
                             disabled
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                        Email:
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                             value={customer.email}
                             disabled
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                        Телефон:
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                             value={customer.phone}
                             disabled
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                        Метод зв‘язку:
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                             value={connectionMethod}
                             disabled
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                        Спосіб оплати:
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                             value={`${paymentMethod}`}
                             disabled
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon3">
                        Спосіб доставки:
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="basic-url" aria-describedby="basic-addon3"
                             value={`${delivery.method}`}
                             disabled
                />
            </InputGroup>

            {
                delivery.method !== 'самовивіз' && <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                            Адреса:
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                 value={addressToShow || ''}
                                 disabled
                    />
                </InputGroup>
            }
            <hr/>
            <Table striped bordered size="sm">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Товар</th>
                    <th>Колір</th>
                    <th>Кількість</th>
                    <th>Ціна за шт.</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.map((product, i) => (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{product.name}</td>
                            <td><span className={'order-color'} style={{backgroundColor: product.color}}/></td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
            <div className='purchase__summary'>
                <p>Товару на суму: {totalProductSum} UAH</p>
                {!!deliveryPrice && <p>Ціна доставки: {deliveryPrice} UAH</p>}
                <h5>Загалом: {totalProductSum + deliveryPrice} UAH</h5>
            </div>
            <hr/>

            <div className='purchase__status'>
                <h6>Статус: <Badge variant={orderStatusVariant(status)}>{ORDER_STATUSES[status].name}</Badge></h6>
                <DropdownBar
                    items={Object.values(ORDER_STATUSES)}
                    selectedValue={dropdownBarValue}
                    setSelectedValue={onSelectDropdownBarItem}
                    size
                />
                <Button size="sm" variant="primary" onClick={onChangeStatus}>
                    Змінити статус
                </Button>
            </div>

            <div className={'purchase__delete'}>
                <Button variant="outline-dark" onClick={onDeletePurchase}>
                    Видалити
                </Button>
            </div>
        </div>
    )
}

export default OrderRedactor;
