import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Icon, Loader} from "semantic-ui-react";
import {Form} from "react-bootstrap";

import {
    setImagesToDeleteAndUpdateState, setImageToSlider,
    uploadImageToCloud
} from "../../redux/images/images.actions";

import './style.scss';

const SliderPlaceholder = ({toSlider, onCheckboxChange}) => {
    const dispatch = useDispatch()
    const {sliderImage, sliderImageLoading} = useSelector(({Images}) => ({
        sliderImage: Images.sliderImage,
        sliderImageLoading: Images.sliderImageLoading
    }))

    const inputFile = useRef(null)

    //HANDLERS
    const onAddImage = ({target}) => {
        console.log('gwg')
        const file = target.files[0]

        if (!file.type.includes('image')) {
            return
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            dispatch(uploadImageToCloud(reader.result, true))
        }
    }

    const onDeleteImage = () => {
        if (sliderImage && window.confirm('Видалити зображення?')) {
            dispatch(setImageToSlider(null))
            dispatch(setImagesToDeleteAndUpdateState(sliderImage.publicId))
        }
    }

    return (
        <div className='slider-placeholder'>

            <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox"
                            label="Відобразити на головній сторінці?"
                            id='toSlider'
                            checked={toSlider || false}
                            onChange={onCheckboxChange}/>
            </Form.Group>

            {toSlider && <>
                {sliderImage &&
                <div className='slider-placeholder__image' style={{backgroundImage: `url(${sliderImage.url})`}}/>}
                {sliderImageLoading && <Loader/>}
                <hr/>
                <div className='slider-placeholder__control'>

                    {!sliderImage && <Icon name='plus circle' onClick={() => inputFile.current.click()}/>}
                    <Icon name='trash alternate outline' onClick={onDeleteImage}/>
                    <input type="file" onChange={onAddImage} ref={inputFile}/>
                </div>
            </>}
        </div>
    )
}

export default SliderPlaceholder;


