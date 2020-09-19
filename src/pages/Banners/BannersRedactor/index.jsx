import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button} from 'react-bootstrap';

import {addBanner, updateBanner} from "../../../redux/banner/banner.actions";

import './style.scss';

const BannerRedactor = ({redactorState, setShowRedactor}) => {
    const dispatch = useDispatch()
    const { banner} = useSelector(({Banners}) => ({
        banner: Banners.banner
    }));

    const bannerDefault = {title: '', description: '', image: '', toSlider: false};

    const [id, setId] = useState('');
    const [bannerObj, setBannerObj] = useState(bannerDefault)

    useEffect(() => {
        if (banner) {
            const {id, title, description, image, toSlider} = banner

            setId(id);
            setBannerObj({title, description, image, toSlider});
        } else {
            onResetInputs()
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

    const onSaveProduct = () => {
        if (bannerObj.title && bannerObj.description && bannerObj.image) {
            dispatch(redactorState === 'add' ?
                addBanner({...bannerObj}) :
                updateBanner({id, banner: {...bannerObj}}))
            onResetInputs();
            setShowRedactor(null)
        } else {
            window.alert('Всі поля з "*" повинні бути заповнені!')
        }
    }

    const onResetInputs = () => {
        setId('');
        setBannerObj(bannerDefault)
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
                                placeholder="Введіть назву продукту"
                                value={bannerObj.title || ''}
                                onChange={onInputChange}/>
                        </Form.Group>

                        <Form.Group >
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
                <div className='category-redactor-buttons'>
                    <Button variant="primary" onClick={onSaveProduct}>
                        Зберегти
                    </Button>
                    <Button variant="dark" onClick={() => {onResetInputs(); setShowRedactor(null)}}>
                        Відмінити
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default BannerRedactor;


