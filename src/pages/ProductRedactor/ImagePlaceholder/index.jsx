import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './style.scss';
import {Button} from "react-bootstrap";
import {Icon} from "semantic-ui-react";

const ImagePlaceholder = ({id, editMode}) => {
    const dispatch = useDispatch()
    const {images, sliderImage} = useSelector(({Upload}) => ({
        images: Upload.images,
        sliderImage: Upload.sliderImage
    }))


    return (
        <div className='image-placeholder'>
            <div className='image-placeholder__images'>
                    <div className={'image-placeholder__images__item'}
                         style={{background: `url(https://react.semantic-ui.com/images/wireframe/image.png) center center`}} />
            </div>
            <div className='image-placeholder__buttons'>
                <Icon name={'trash alternate outline'}/>
            </div>
        </div>
    )
}

export default ImagePlaceholder;


