import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from 'react-bootstrap';
import {Message} from 'semantic-ui-react';

import {List, ButtonsGroup, Pagination} from '../../components';
import ProductRedactor from './ProductRedactor'
import {
    deleteProduct,
    setProduct,
    getProducts
} from "../../redux/product/product.actions";
import {PRODUCT_FILTER_OPTIONS} from '../../config'

import './style.scss'

const ProductsPage = () => {
    const dispatch = useDispatch();
    const {isLoading, products} = useSelector(({Products}) => ({
        isLoading: Products.loading,
        products: Products.list
    }))

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

    const [redactorState, setRedactorState] = useState('');
    const [showRedactor, setShowRedactor] = useState(false);
    const [filter, setFilter] = useState(false);
    const [filteredName, setFilteredName] = useState('');

    const [currentPage, setCurrentPage] = useState(0);

    const onAddProduct = () => {
        setRedactorState('add')
        setShowRedactor(true);
        dispatch(setProduct(null))
    }

    const onEditProduct = (product) => {
        setRedactorState('edit')
        setShowRedactor(true);
        dispatch(setProduct(product))
    }

    const onDeleteProduct = ({id, name}) => {
        window.confirm(`Видалити ${name}?`) && dispatch(deleteProduct(id))
    }

    const onFilterOptionChange = ({target}) => {
        target.innerText === 'Всі' ? setFilter(null) : setFilter(target.dataset.status);
        target.dataset.id === 'search-input' && setFilteredName(target.value.toLowerCase())
    }

    const productsFilter = () => {
        if (filter) {
            return products.filter(product => product[filter])
        } else if (filteredName) {
            return products.filter(product => product.name.toLowerCase().includes(filteredName))
        } else if (filter && filteredName) {
            return products.filter(product => product[filter] && product.name.toLowerCase().includes(filteredName))
        } else {
            return products
        }
    }

    const productsToShow = (length) => productsFilter().slice(length, length + 10)

    return (
        <div className='page-container'>
            <div className='page-list'>
                <div className='page-list__control'>
                    <Button className='list-add-button'
                            variant="primary"
                            onClick={onAddProduct}> Додати +</Button>
                    <ButtonsGroup onChange={onFilterOptionChange} items={PRODUCT_FILTER_OPTIONS}/>
                    <input type='text' placeholder='Пошук...'
                           onChange={onFilterOptionChange} data-id='search-input'/>
                </div>
                <List
                    items={productsToShow(currentPage)}
                    isLoading={isLoading}
                    onEditItem={onEditProduct}
                    onDeleteItem={onDeleteProduct}
                />
                {productsToShow(currentPage).length && <Pagination
                    productsFilter={productsFilter}
                    productsToShow={productsToShow}
                    setCurrentPage={setCurrentPage}
                />}
            </div>
            <div className='page-container__item'>
                {showRedactor ? <ProductRedactor
                        redactorState={redactorState}
                    /> :
                    <div className='page-item-message'>Редагуйте елемет зі списку або добавте новий</div>}

            </div>
        </div>
    )
}

export default ProductsPage;
