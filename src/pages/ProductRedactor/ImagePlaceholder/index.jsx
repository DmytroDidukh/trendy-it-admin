import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, Loader} from "semantic-ui-react";

import {
    setImagesToDeleteAndUpdateState,
    uploadImageToCloud
} from "../../../redux/images/images.actions";

import './style.scss';

const ImagePlaceholder = () => {
    const dispatch = useDispatch()
    const {images, sliderImage, loading} = useSelector(({Images}) => ({
        images: Images.images,
        sliderImage: Images.sliderImage,
        loading: Images.loading
    }))

    //HOOKS
    const [sliderPosition, setSliderPosition] = useState(0)
    const sliderImages = useRef(null)

    //HANDLERS
    const onSliderScroll = ({target: {id}}) => {
        const transformValue = sliderImages.current.style.transform;
        const currentPosition = (transformValue && transformValue.match(/-*\d+/)[0]) || 0;

        if (id === 'slider-left' && sliderPosition > 0) {
            setSliderPosition(sliderPosition - 1)
            sliderImages.current.style.transform = `translateX(${+currentPosition + 300}px)`
        } else if (id === 'slider-right' && sliderPosition < images.length) {
            setSliderPosition(sliderPosition + 1)
            sliderImages.current.style.transform = `translateX(${+currentPosition - 300}px)`
        }
    }

    const onAddImage = ({target}) => {
        const file = target.files[0]

        if (!file.type.includes('image')) {
            return
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            dispatch(uploadImageToCloud(reader.result))
        }
    }

    const onDeleteImage = () => {
        if (sliderPosition === images.length) {
            return
        }

        if (window.confirm('Видалити зображення?')) {
            dispatch(setImagesToDeleteAndUpdateState(images[sliderPosition].publicId))
        }
    }

    return (
        <div className='image-placeholder'>

            <div className='image-placeholder__container'>
                <div className='image-placeholder__images' ref={sliderImages}>
                    {
                        images.map(img => (
                            <div key={img.publicId} className='image-placeholder__images__item'
                                 style={{backgroundImage: `url(${img.url})`}}/>
                        ))
                    }
                    <div className='image-placeholder__images__item default'>
                        {
                            loading ?
                                <Loader style={{zIndex: 1000, display: 'block'}}/>
                                :
                                <>
                                    <Icon name='plus circle'/>
                                    <p>Натисніть для завантаження</p>

                                </>
                        }
                        <label htmlFor="upload-photo"/>
                        <input type="file" name="photo" id="upload-photo" onChange={onAddImage}/>
                    </div>
                </div>
                <div className={'slider-control'}>
                    <Icon name='chevron circle left' id='slider-left' onClick={onSliderScroll}/>
                    <Icon name='chevron circle right' id='slider-right' onClick={onSliderScroll}/>
                </div>
            </div>

            <div className='image-placeholder__buttons'>
                <Icon name={'trash alternate outline'} onClick={onDeleteImage}/>
            </div>
        </div>
    )
}

export default ImagePlaceholder;


