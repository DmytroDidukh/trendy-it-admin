import React, { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';

import './style.scss';

const FilterButtons = ({ filter, setQuery, items, linkValue }) => {
  const dispatch = useDispatch();
  const [buttonId, setButtonId] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const onSelectFilter = (id, key, value) => {
    setQuery((prev) => ({
      ...prev,
      filter: {
        [key]: value
      },
      page: 1
    }));
    dispatch(push(`/${linkValue}/pages=${1}`));
    setButtonId(id);
    setInputValue(key === 'search' ? value : '');
  };

  const onClearFilter = () => {
    setQuery({
      filter: {},
      sort: '-createdAt',
      page: 1
    });

    dispatch(push(`/${linkValue}/pages=${1}`));
    setButtonId(0);
    setInputValue('');
  };

  return (
    <ButtonGroup className='list-filter-buttons' toggle>
      <Button
        variant={buttonId === 0 ? 'secondary' : 'outline-secondary'}
        onClick={onClearFilter}
      >
        Всі
      </Button>
      {items.map((item) => (
        <Button
          key={item.id}
          variant={buttonId === item.id ? 'secondary' : 'outline-secondary'}
          onClick={() => onSelectFilter(item.id, item.key, item.value)}
        >
          {item.name}
        </Button>
      ))}
      <input
        type='text'
        placeholder='Пошук...'
        value={inputValue}
        onChange={({ target }) => onSelectFilter(null, 'search', target.value)}
        id='search-input'
      />
    </ButtonGroup>
  );
};

export default FilterButtons;
