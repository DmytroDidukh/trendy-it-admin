import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Form, Button} from 'react-bootstrap';

import {addProduct, updateProduct} from "../../../redux/product/product.actions";
import {PRODUCT_DEFAULT, IMAGES_DEFAULT, COLORS_DEFAULT, COLORS_DATA} from '../../../config'

import './style.scss';

const ProductRedactor = ({redactorState}) => {
    const dispatch = useDispatch()
    const {product} = useSelector(({Products}) => ({
        product: Products.product
    }));

    const [id, setId] = useState('');
    const [images, setImages] = useState({...IMAGES_DEFAULT});
    const [colors, setColors] = useState(COLORS_DEFAULT);
    const [productObj, setProductObj] = useState(PRODUCT_DEFAULT)

    useEffect(() => {
        if (product) {
            const {price, oldPrice, name, description, id, images, colors, sale, hot, available, newItem, toSlider} = product

            setId(id);
            setProductObj({price, oldPrice, name, description, available, sale, hot, newItem, toSlider});
            setImages({slider: images.slider, product: images.product.map(img => ({link: img.link}))});


            const colorsArray = Object.entries(colors).filter( ([key]) => key !== '__typename')
            setColors(Object.assign(COLORS_DEFAULT, Object.fromEntries(colorsArray)));
        } else {
            onResetInputs()
        }
    }, [product]);

    const onInputChange = (e) => {
        const value = isFinite(e.target.value) ? +e.target.value : e.target.value
        const newObj = {...productObj};

        newObj[e.target.name] = value
        setProductObj(newObj)
    }

    const onCheckboxChange = ({target}) => {
        setProductObj({...productObj, [target.id]: target.checked})
    }

    const onColorChange = ({target: {id, checked}}) => {
        setColors({...colors, [id]: checked});
    }

    const onImageInputChange = (e, idx) => {
        if (e.target.name === 'slider-image') {
            setImages({slider: e.target.value, product: images.product})
        } else {
            const values = [...images.product];

            values[idx].link = e.target.value;
            setImages({slider: images.slider, product: values});
        }
    }

    const onAddImageInput = () => {
        const newArr = [...images.product, {link: ''}]
        setImages({...images, product: newArr});
    }

    const onSaveProduct = () => {
        if (productObj.name && productObj.price) {
            dispatch(redactorState === 'add' ?
                addProduct({...productObj, images, colors}) :
                updateProduct({id, product: {...productObj, images, colors}}))
            onResetInputs();
        } else {
            window.alert('Всі поля з "*" повинні бути заповнені!')
        }
    }

    const onResetInputs = () => {
        setId('');
        setImages({slider: '', product: [{link: ''}]})
        setColors(COLORS_DEFAULT)
        setProductObj(PRODUCT_DEFAULT)
    }

    return (
        <div className='product-redactor-container'>
            <Form>
                <div className='product-redactor-flex'>
                    <div className='product-redactor-flex-left'>

                        <div className='product-available'
                             style={{background: productObj.available ? '#28a745' : '#dc3545'}}>
                            <Form.Group id="formGridCheckbox">
                                <Form.Check type="checkbox"
                                            label={productObj.available ? 'Так' : 'Ні'}
                                            id='available'
                                            checked={productObj.available || false}
                                            onChange={onCheckboxChange}/>
                            </Form.Group>
                        </div>

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

                        <Form.Group id="formGridCheckbox">
                            <Form.Check type="checkbox"
                                        label="Відобразити у на головній сторінці?"
                                        id='toSlider'
                                        checked={productObj.toSlider || false}
                                        onChange={onCheckboxChange}/>
                        </Form.Group>

                        {productObj.toSlider && <Form.Group>
                            <Form.Label>Зображення на слайдер (широкоформатне):</Form.Label>
                            <Form.Control
                                name='slider-image'
                                type="text"
                                placeholder="Посилання на зображення"
                                value={images.slider || ''}
                                onChange={onImageInputChange}/>
                        </Form.Group>}

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
                    </div>

                    <div className='prodcut-redactor-flex-right'>
                        <Form.Group>
                            <Form.Label>Посилання на зоображення:</Form.Label>
                            {images.product.map((img, idx) => {
                                return (
                                    <Form.Control
                                        key={idx + img.link}
                                        name={`image-${idx}`}
                                        type="textarea"
                                        placeholder="Введіть посилання на зоображення"
                                        value={img.link || ''}
                                        onChange={e => onImageInputChange(e, idx)}/>
                                )
                            })}
                            <div className="addImageInput-btn">
                                <Button variant="outline-dark"
                                        onClick={onAddImageInput}>Додати зображення</Button>
                            </div>

                            <div className="product-colors">
                                <h6>Наявні кольори:</h6>
                                {(productObj.name || redactorState) && COLORS_DATA.map((color, i) => (
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
                <div className='category-redactor-buttons'>
                    <Button variant="primary" onClick={onSaveProduct}>
                        Зберегти
                    </Button>
                    <Button variant="dark" onClick={onResetInputs}>
                        Відмінити
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default ProductRedactor;


