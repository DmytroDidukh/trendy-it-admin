import React from 'react';
import { Pagination as BasePagination } from 'semantic-ui-react';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

const Pagination = ({ pagination, setQuery }) => {
  const dispatch = useDispatch();

  const onPageChange = (e, { activePage }) => {
    setQuery((query) => ({
      ...query,
      page: +activePage
    }));
    dispatch(push(`/products/pages=${activePage}`));
  };

  return (
    <BasePagination
      defaultActivePage={pagination.currentPage}
      firstItem={null}
      lastItem={null}
      pointing
      secondary
      totalPages={pagination.totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default Pagination;
