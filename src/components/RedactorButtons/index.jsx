import React from 'react';
import { Button } from 'react-bootstrap';

import './style.scss';

const RedactorButtons = ({ onSaveProduct, onGoBack }) => {
  return (
    <div className='redactor-buttons'>
      <Button variant='success' onClick={onSaveProduct}>
        Зберегти
      </Button>
      <Button variant='outline-dark' onClick={() => onGoBack(true)}>
        Назад
      </Button>
    </div>
  );
};

export default RedactorButtons;
