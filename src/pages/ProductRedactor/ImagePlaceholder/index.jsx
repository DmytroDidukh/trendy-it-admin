import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import './style.scss';
import {Button} from "react-bootstrap";
import {Icon} from "semantic-ui-react";

/*const images = [
    {url: 'https://a.lmcdn.ru/product/R/O/RO046BWFZAD5_9094490_1_v1.jpg'},
    {url: 'https://a.lmcdn.ru/product/M/A/MA002BWKCII0_11642551_1_v1.jpg'},
]*/

const ImagePlaceholder = ({id, editMode}) => {
    const dispatch = useDispatch()
    const {images, sliderImage} = useSelector(({Upload}) => ({
        images: Upload.images,
        sliderImage: Upload.sliderImage
    }))

    const [sliderPosition, setSliderPosition] = useState(0)

    const sliderImages = useRef(null)

    const onSliderScroll = ({target: {id}}) => {
        const transformValue = sliderImages.current.style.transform
        const currentPosition = (transformValue && transformValue.match(/-*\d+/)[0]) || 0


        if (id === 'slider-left' && sliderPosition > 0) {
            setSliderPosition(sliderPosition - 1)
            sliderImages.current.style.transform = `translateX(${+currentPosition + 300}px)`
        } else if (id === 'slider-right' && sliderPosition < images.length) {
            setSliderPosition(sliderPosition + 1)
            sliderImages.current.style.transform = `translateX(${+currentPosition - 300}px)`
        }
    }

    return (
        <div className='image-placeholder'>

            <div className='image-placeholder__container'>
                <div className='image-placeholder__images' ref={sliderImages}>
                    {
                        images.map(img => (
                            <div key={img.link} className='image-placeholder__images__item'
                                 style={{backgroundImage: `url(${img.link})`}}/>
                        ))
                    }
                    <div className='image-placeholder__images__item default'>
                        <Icon name='plus circle'/>
                        <p>Натисніть для завантаження</p>
                        <label htmlFor="upload-photo"/>
                        <input type="file" name="photo" id="upload-photo"/>
                    </div>
                </div>
                <div className={'slider-control'}>
                    <Icon name='chevron circle left' id='slider-left' onClick={onSliderScroll}/>
                    <Icon name='chevron circle right' id='slider-right' onClick={onSliderScroll}/>
                </div>
            </div>

            <div className='image-placeholder__buttons'>
                <Icon name={'trash alternate outline'}/>
            </div>
        </div>
    )
}

export default ImagePlaceholder;


