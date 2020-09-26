import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form} from 'react-bootstrap';

import {RedactorButtons} from "../../components";
import {addBanner, getBannerById, updateBanner} from "../../redux/banner/banner.actions";

import './style.scss';
import {push} from "connected-react-router";

const BannerRedactor = ({id, editMode}) => {
    const dispatch = useDispatch()
    const {banner} = useSelector(({Banners}) => ({
        banner: Banners.banner
    }));

    const bannerDefault = {title: '', description: '', image: '', toSlider: false};
    const [bannerObj, setBannerObj] = useState({...bannerDefault})

    useEffect(() => {
        id && dispatch(getBannerById(id))
    }, [dispatch, id])

    useEffect(() => {
        if (banner) {
            const {title, description, image, toSlider} = banner

            setBannerObj({title, description, image, toSlider});
        }
    }, [banner]);

    const onInputChange = (e) => {
        const value = e.target.value
        const newObj = {...bannerObj};

        newObj[e.target.name] = value
        setBannerObj(newObj)
    }

    const onCheckboxChange = ({target}) => {
        setBannerObj({...bannerObj, [target.id]: target.checked})
    }

    const onSaveBanner = () => {
        if (bannerObj.title && bannerObj.description && bannerObj.image) {
            dispatch(!editMode ?
                addBanner({...bannerObj}) :
                updateBanner({id, banner: {...bannerObj}}))
            onResetInputs();
            dispatch(push('/banners'))
        } else {
            window.alert('Всі поля з "*" повинні бути заповнені!')
        }
    }

    const onResetInputs = () => {
        setBannerObj(bannerDefault)
        dispatch(push('/banners'))
    }

    return (
        <div className='product-redactor-container'>
            <Form>
                <div className='product-redactor-flex'>
                    <div className='product-redactor-flex-left'>
                        <Form.Group>
                            <Form.Label>*Заголовок:</Form.Label>
                            <Form.Control
                                name='title'
                                type="text"
                                placeholder="Введіть назву баннера"
                                value={bannerObj.title || ''}
                                onChange={onInputChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>*Опис:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="5"
                                name='description'
                                type="textarea"
                                placeholder="Введіть опис баннеру"
                                value={bannerObj.description || ''}
                                onChange={onInputChange}
                            />

                        </Form.Group>

                        <Form.Group id="formGridCheckbox">
                            <Form.Check type="checkbox"
                                        label="Відобразити у на головній сторінці?"
                                        id='toSlider'
                                        checked={bannerObj.toSlider || false}
                                        onChange={onCheckboxChange}/>
                        </Form.Group>

                    </div>
                    <div className='prodcut-redactor-flex-right'>
                        <Form.Group>
                            <Form.Label>*Посилання на зоображення:</Form.Label>
                            <Form.Control
                                name='image'
                                type="text"
                                placeholder="Введіть посилання на зображення"
                                value={bannerObj.image || ''}
                                onChange={onInputChange}/>
                        </Form.Group>
                    </div>

                </div>
                <RedactorButtons
                    onSaveProduct={onSaveBanner}
                    onResetInputs={onResetInputs}
                />
            </Form>
        </div>
    )
}

export default BannerRedactor;


