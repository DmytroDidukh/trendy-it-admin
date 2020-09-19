import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button} from 'react-bootstrap';
import {Input} from 'semantic-ui-react';

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
    const [searchValue, setSearchValue] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);

    const onAddProduct = () => {
        setRedactorState('add')
        setShowRedactor(true);
        dispatch(setProduct(null))
    }

    const onEditProduct = (product) => {
        window.innerWidth <= 1100 && window.scroll(0, 600)

        setRedactorState('edit')
        setShowRedactor(true);
        dispatch(setProduct(product))
    }

    const onDeleteProduct = ({id, name}) => {
        window.confirm(`Видалити ${name}?`) && dispatch(deleteProduct(id))
    }

    const onFilterOptionChange = ({target}) => {
        if (target.innerText === 'Всі') {
            return setFilter(null)
        } else if (target.id === 'search-input') {
            return setSearchValue(target.value.toLowerCase())
        } else {
            setFilter(target.dataset.status);
        }
    }

    const productsFilter = () => {
        if (filter && !searchValue) {
            return products.filter(product => product[filter])
        } else if (filter && searchValue) {
            return products.filter(product => product[filter] && product.name.toLowerCase().includes(searchValue))
        } else if (searchValue) {
            return products.filter(product => product.name.toLowerCase().includes(searchValue))
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
                    <Input placeholder='Пошук...'
                           onChange={onFilterOptionChange} id='search-input'
                    />
                </div>
                <List
                    items={productsToShow(currentPage)}
                    isLoading={isLoading}
                    onEditItem={onEditProduct}
                    onDeleteItem={onDeleteProduct}
                />
                {!!productsToShow(currentPage).length && <Pagination
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
