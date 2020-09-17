import React from 'react'
import {DropdownButton, ButtonGroup, Dropdown} from 'react-bootstrap'

const DropdownBar = ({items, selectedValue, setSelectedValue, size}) => {

    return (
        <>
            <DropdownButton
                as={ButtonGroup}
                id={`dropdown-variants-${'Secondary'}`}
                variant={'secondary'}
                size={size && 'sm'}
                title={selectedValue || 'Виберіть опцію'}
            >
                {
                    items.map((item, i) => (
                        <Dropdown.Item
                            key={item.id || i}
                            data-id={item.id}
                            data-status={item.status}
                            eventKey={i}
                            onSelect={setSelectedValue}>
                            {item.name}
                        </Dropdown.Item>
                    ))
                }
            </DropdownButton>{' '}
        </>
    )
}

export default DropdownBar
