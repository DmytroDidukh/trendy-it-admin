import React from 'react';
import { Spinner as LoadingBar } from 'react-bootstrap';

import './style.scss';

const Spinner = () => {
        return (
                <div className='spinner'>
                        <LoadingBar animation="border" role="status" className='spinner'>
                                <span className="sr-only">Loading...</span>
                        </LoadingBar>
                </div>

        )
}

export default Spinner
