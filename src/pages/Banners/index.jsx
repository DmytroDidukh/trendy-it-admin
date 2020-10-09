import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { push } from 'connected-react-router';

import { List } from '../../components';
import {
  deleteBanner,
  setBanner,
  getBanners
} from '../../redux/banner/banner.actions';
import { clearImagesState } from '../../redux/images/images.actions';

import './style.scss';

const BannersPage = () => {
  const dispatch = useDispatch();
  const { isLoading, banners } = useSelector(({ Banners }) => ({
    isLoading: Banners.loading,
    banners: Banners.list
  }));

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const onAddBanner = () => {
    dispatch(push('/banners/create'));
    dispatch(setBanner(null));
  };

  const onEditBanner = (banner) => {
    dispatch(clearImagesState());
    dispatch(push(`/banners/${banner.id}`));
  };

  const onDeleteBanner = ({ id, title }) => {
    window.confirm(`Видалити ${title}?`) && dispatch(deleteBanner(id));
  };

  return (
    <div className='page-container'>
      <div className='page-list'>
        <Button
          className='list-add-button'
          variant='primary'
          onClick={onAddBanner}
        >
          {' '}
          Додати +
        </Button>
        <List
          items={banners}
          isLoading={isLoading}
          onEditItem={onEditBanner}
          onDeleteItem={onDeleteBanner}
        />
      </div>
    </div>
  );
};

export default BannersPage;
