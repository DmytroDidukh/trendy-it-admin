import React, {useState} from 'react';
import {ButtonGroup, Button} from 'react-bootstrap';

import './style.scss';

const ButtonsGroup = ({items, onChange, options}) => {
    const [radioValue, setRadioValue] = useState('all');
    const onSelected = (e) => {
        onChange(e);
        setRadioValue(e.currentTarget.value)
    }

    return (
        <ButtonGroup className='list-filter-buttons' toggle>
            <Button
                value={'all'}
                variant={radioValue === 'all' ? "secondary" : "outline-secondary"}
                onClick={onSelected}>
                Всі
            </Button>
            {items.map((item, idx) => (
                <Button
                    key={item.id || idx}
                    variant={+radioValue === idx ? "secondary" : "outline-secondary"}
                    value={idx}
                    onClick={onSelected}
                    data-status={item.status}
                >
                    {item.name}
                </Button>
            ))}
        </ButtonGroup>
    )
}

export default ButtonsGroup
