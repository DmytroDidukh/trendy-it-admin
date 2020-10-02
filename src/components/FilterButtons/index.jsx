import React, { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { Input } from 'semantic-ui-react';

import './style.scss';

const FilterButtons = ({ filter, setQuery, items }) => {
  const dispatch = useDispatch();
  const [radioValue, setRadioValue] = useState(Object.keys(filter)[0] || 'all');

  const onSelectFilter = (key, value) => {
    setQuery((prev) => ({
      ...prev,
      filter: {
        [key]: value
      }
    }));
    setRadioValue(key);
  };

  const onClearFilter = () => {
    setQuery({
      filter: {},
      sort: '-createdAt',
      page: 1
    });

    dispatch(push(`/products/pages=${1}`));
    setRadioValue('all');
  };

  return (
    <ButtonGroup className='list-filter-buttons' toggle>
      <Button
        variant={radioValue === 'all' ? 'secondary' : 'outline-secondary'}
        onClick={onClearFilter}
      >
        Всі
      </Button>
      {items.map((item, idx) => (
        <Button
          key={item.key}
          variant={radioValue === item.key ? 'secondary' : 'outline-secondary'}
          value={idx}
          onClick={() => onSelectFilter(item.key, true)}
        >
          {item.name}
        </Button>
      ))}
      <Input
        placeholder='Пошук...'
        onChange={({ target }) => onSelectFilter('search', target.value)}
        id='search-input'
      />
    </ButtonGroup>
  );
};

export default FilterButtons;
