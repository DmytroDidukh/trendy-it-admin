import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from 'react-bootstrap';

import { List, FilterButtons, Pagination } from '../../components';
import {
  deleteProduct,
  setProduct,
  getProducts
} from '../../redux/product/product.actions';
import { clearImagesState } from '../../redux/images/images.actions';
import { PRODUCT_FILTER_OPTIONS } from '../../config';

import './style.scss';

const ProductsPage = ({ page }) => {
  const dispatch = useDispatch();
  const { isLoading, products, pagination } = useSelector(({ Products }) => ({
    isLoading: Products.loading,
    products: Products.list,
    pagination: Products.pagination
  }));

  const [query, setQuery] = useState({
    filter: {},
    sort: '-createdAt',
    page: +page
  });

  useEffect(() => {
    dispatch(getProducts(query));
    window.scroll(0, 0);
  }, [query, dispatch]);

  const onAddProduct = () => {
    dispatch(push('/products/create'));
    dispatch(setProduct(null));
    dispatch(clearImagesState());
  };

  const onEditProduct = (product) => {
    dispatch(clearImagesState());
    dispatch(push(`/products/${product.id}`));
  };

  const onDeleteProduct = ({ id, name }) => {
    if (window.confirm(`Видалити ${name}?`)) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className='page-container'>
      <div className='page-list'>
        <div className='page-list__control'>
          <Button
            className='list-add-button'
            variant='primary'
            onClick={onAddProduct}
          >
            {' '}
            Додати +
          </Button>
          <FilterButtons
            onChange={() => {}}
            filter={query.filter}
            setQuery={setQuery}
            items={PRODUCT_FILTER_OPTIONS}
          />
        </div>
        <List
          items={products}
          isLoading={isLoading}
          onEditItem={onEditProduct}
          onDeleteItem={onDeleteProduct}
        />
        {!!products.length && (
          <Pagination pagination={pagination} setQuery={setQuery} />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
