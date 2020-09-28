import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button} from 'react-bootstrap';
import {push} from 'connected-react-router'
import {Icon, Radio} from "semantic-ui-react";

import {RedactorButtons} from "../../components";
import ImagePlaceholder from "./ImagePlaceholder";
import SliderPlaceholder from "./SliderPlaceholder";
import {
    addProduct,
    updateProduct,
    getProductById
} from "../../redux/product/product.actions";
import {clearImagesState, deleteImagesFromCloud} from "../../redux/images/images.actions";
import {typenameRemover} from "../../utils";
import {
    PRODUCT_DEFAULT,
    COLORS_DEFAULT,
    COLORS_DATA
} from '../../config'

import './style.scss';

const ProductRedactor = ({id, editMode}) => {
    const dispatch = useDispatch()
    const {product, productImages, sliderImage, imagesToDelete} = useSelector(({Products, Images}) => ({
        product: Products.product,
        productImages: Images.images,
        sliderImage: Images.sliderImage,
        imagesToDelete: Images.imagesToDelete,
    }))

    const [colors, setColors] = useState(COLORS_DEFAULT);
    const [productObj, setProductObj] = useState(PRODUCT_DEFAULT)

    useEffect(() => {
        id && dispatch(getProductById(id))
    }, [dispatch, id])

    useEffect(() => {
        if (product) {
            const {price, oldPrice, name, description, colors, sale, hot, available, newItem, toSlider} = product

            setProductObj({price, oldPrice, name, description, available, sale, hot, newItem, toSlider});

            const copyColorsDefault = JSON.stringify(COLORS_DEFAULT)
            setColors({...JSON.parse(copyColorsDefault), ...typenameRemover(colors)});
        }
    }, [product]);

    const onInputChange = (e) => {
        const value = isFinite(e.target.value) ? +e.target.value : e.target.value
        const newObj = {...productObj};

        newObj[e.target.name] = value
        setProductObj(newObj)
    }

    const onCheckboxChange = ({target}) => setProductObj({...productObj, [target.id]: target.checked})
    const onToggleChange = (_, {dataid, checked}) => setProductObj({...productObj, [dataid]: checked})
    const onColorChange = ({target: {id, checked}}) => setColors({...colors, [id]: checked});

    const checkFieldsBeforeSubmit = () => {
        return productObj.name && productObj.price && productImages[0] && Object.values(colors).some(val => val)
    }

    const onSaveProduct = () => {
        const imagesToSend = {
            slider: typenameRemover(sliderImage),
            product: typenameRemover(productImages)
        }

        if (checkFieldsBeforeSubmit()) {
            imagesToDelete.length && dispatch(deleteImagesFromCloud(imagesToDelete))

            dispatch(!editMode ?
                addProduct({...productObj, images: imagesToSend, colors}) :
                updateProduct({id, product: {...productObj, images: imagesToSend, colors}}))
            onResetInputs();
            dispatch(push('/products'))
        } else {
            window.alert('Всі поля з "*" повинні бути заповнені і додане одне зображеня для товару!')
        }
    }

    const onGoBack = (location) => {
        if (location && !window.confirm('Скасувати зміни?')) {
            return
        }

        let notSavedImages;
        if (editMode) {
            const savedImages = product.images
            notSavedImages = [sliderImage, ...imagesToDelete, ...productImages.filter(img => savedImages.product.find(obj => obj.publicId !== img.publicId))]
                .filter(val => val)
                .map(img => img.publicId ? img.publicId : img)
        } else {
            notSavedImages = [sliderImage, ...productImages, ...imagesToDelete]
                .filter(val => val)
                .map(img => img.publicId ? img.publicId : img)
        }

        notSavedImages.length && dispatch(deleteImagesFromCloud(notSavedImages))
        onResetInputs()
    }

    const onResetInputs = () => {
        setColors(COLORS_DEFAULT)
        setProductObj(PRODUCT_DEFAULT)
        dispatch(clearImagesState())
        dispatch(push('/products'))
    }

    return (
        <div className='product-redactor-container'>
            <Icon name='arrow left' onClick={() => onGoBack(false)} className={'back-arrow'}/>
            <Form>
                <div className='product-redactor'>
                    <div className='product-redactor-left'>

                        <div className='product-available'>
                            Наявність: <Radio toggle
                                              dataid='available'
                                              checked={productObj.available || false}
                                              onChange={onToggleChange}/>
                        </div>

                        <div className='images-block'>
                            <ImagePlaceholder/>

                            <div className=''>
                                <Form.Group>
                                    <Form.Label>*Назва продукту:</Form.Label>
                                    <Form.Control
                                        name='name'
                                        type="text"
                                        placeholder="Введіть назву продукту"
                                        value={productObj.name || ''}
                                        onChange={onInputChange}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>*Ціна:</Form.Label>
                                    <Form.Control
                                        name='price'
                                        type="number"
                                        placeholder="Введіть ціну продукту"
                                        value={productObj.price || 0}
                                        onChange={onInputChange}/>
                                </Form.Group>

                                <Form.Group id="formGridCheckbox">
                                    <Form.Check type="checkbox"
                                                label="Розпродаж &#129297;"
                                                id='sale'
                                                checked={productObj.sale || false}
                                                onChange={onCheckboxChange}/>
                                </Form.Group>

                                {productObj.sale && <Form.Group>
                                    <Form.Label>Стара ціна:</Form.Label>
                                    <Form.Control
                                        name='oldPrice'
                                        type="number"
                                        placeholder="Введіть стару ціну продукту"
                                        value={productObj.oldPrice || 0}
                                        onChange={onInputChange}/>
                                </Form.Group>}

                                <Form.Group id="formGridCheckbox">
                                    <Form.Check type="checkbox"
                                                label="Хіт продаж &#128293;"
                                                id='hot'
                                                checked={productObj.hot || false}
                                                onChange={onCheckboxChange}/>
                                </Form.Group>

                                <Form.Group id="formGridCheckbox">
                                    <Form.Check type="checkbox"
                                                label="Новинка"
                                                id='newItem'
                                                checked={productObj.newItem || false}
                                                onChange={onCheckboxChange}/>
                                </Form.Group>

                                <SliderPlaceholder
                                    onCheckboxChange={onCheckboxChange}
                                    toSlider={productObj.toSlider} />
                            </div>
                        </div>
                    </div>

                    <div className='product-redactor-right'>

                        <Form.Group>
                            <Form.Label>Опис продукту:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="8"
                                name='description'
                                type="textarea"
                                placeholder="Введіть опис продукту"
                                value={productObj.description || ''}
                                onChange={onInputChange}
                            />

                        </Form.Group>

                        <Form.Group>
                            <div className="product-colors">
                                <h6>*Наявні кольори:</h6>
                                {COLORS_DATA.map((color, i) => (
                                    <Form.Group id="formGridCheckbox" key={i}>
                                        <span style={{background: color.hex}}/>
                                        <Form.Check type="checkbox"
                                                    label={color.name}
                                                    id={color.type}
                                                    checked={Object.keys(colors).find(type => colors[type] && type === color.type) || false}
                                                    onChange={onColorChange}/>
                                    </Form.Group>
                                ))}
                            </div>

                        </Form.Group>
                    </div>

                </div>
                <RedactorButtons
                    onSaveProduct={onSaveProduct}
                    onGoBack={onGoBack}
                />
            </Form>
        </div>
    )
}

export default ProductRedactor;


