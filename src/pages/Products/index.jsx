import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {push} from 'connected-react-router';
import {Button} from 'react-bootstrap';
import {Input} from 'semantic-ui-react';

import {List, ButtonsGroup, Pagination} from '../../components';
import {
    deleteProduct,
    setProduct,
    getProducts
} from "../../redux/product/product.actions";
import {clearImagesState} from "../../redux/images/images.actions";
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

    const [filter, setFilter] = useState(false);
    const [searchValue, setSearchValue] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);

    const onAddProduct = () => {
        dispatch(push('/products/create'))
        dispatch(setProduct(null))
        dispatch(clearImagesState())
    }

    const onEditProduct = (product) => {
        dispatch(clearImagesState())
        dispatch(push(`/products/${product.id}`))
    }

    const onDeleteProduct = ({id, name}) => {
        if (window.confirm(`Видалити ${name}?`)) {
            dispatch(deleteProduct(id))
        }
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

    const setProductsToShow = (lengthIndex) => {
        const products = productsFilter()
        const isEnoughProducts = products.length >= 12

        return isEnoughProducts ? products.slice(lengthIndex, lengthIndex + 12) : products.slice(0, 12)
    }

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
                    items={setProductsToShow(currentPage)}
                    isLoading={isLoading}
                    onEditItem={onEditProduct}
                    onDeleteItem={onDeleteProduct}
                />
                {!!setProductsToShow(currentPage).length && <Pagination
                    itemsFilter={productsFilter}
                    setItemsToShow={setProductsToShow}
                    setCurrentPage={setCurrentPage}
                    paginationLength={12}
                />}
            </div>
        </div>
    )
}

export default ProductsPage;
