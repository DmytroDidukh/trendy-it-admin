import React from 'react';
import { Pagination as BasePagination } from 'semantic-ui-react';

const Pagination = ({
  itemsFilter,
  setItemsToShow,
  setCurrentPage,
  paginationLength
}) => {
  const itemsAfterFiltering = itemsFilter();

  const onPageChange = (e, data) => {
    let lengthIndex;
    if (data.activePage.toString().includes('.')) {
      lengthIndex = data.activePage.toString().split('.')[0] * paginationLength;
    } else {
      lengthIndex =
        (data.activePage === 1 || data.activePage === undefined
          ? 0
          : data.activePage - 1) * paginationLength;
    }
    if (lengthIndex >= itemsAfterFiltering.length) return;

    setCurrentPage(lengthIndex);
    setItemsToShow(lengthIndex);
  };

  return (
    <BasePagination
      defaultActivePage={1}
      firstItem={null}
      lastItem={null}
      pointing
      secondary
      totalPages={itemsAfterFiltering.length / paginationLength}
      onPageChange={onPageChange}
    />
  );
};

export default Pagination;
