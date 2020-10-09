import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { push } from 'connected-react-router';

import { RedactorButtons, SliderPlaceholder } from '../../components';
import {
  addBanner,
  getBannerById,
  updateBanner
} from '../../redux/banner/banner.actions';
import {
  clearImagesState,
  deleteImagesFromCloud
} from '../../redux/images/images.actions';
import { BANNER_DEFAULT } from '../../config';

import './style.scss';
import { typenameRemover } from '../../utils';

const BannerRedactor = ({ id, editMode }) => {
  const dispatch = useDispatch();
  const { banner, sliderImage, imagesToDelete } = useSelector(
    ({ Banners, Images }) => ({
      banner: Banners.banner,
      sliderImage: Images.sliderImage,
      imagesToDelete: Images.imagesToDelete
    })
  );

  const [bannerObj, setBannerObj] = useState({ ...BANNER_DEFAULT });

  useEffect(() => {
    id && dispatch(getBannerById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (banner) {
      const { title, description, toSlider } = banner;
      setBannerObj({ title, description, toSlider });
    }
  }, [banner]);

  const onInputChange = (e) => {
    const value = e.target.value;
    const newObj = { ...bannerObj };

    newObj[e.target.name] = value;
    setBannerObj(newObj);
  };

  const onCheckboxChange = ({ target }) => {
    setBannerObj({ ...bannerObj, [target.id]: target.checked });
  };

  const onSaveBanner = () => {
    if (bannerObj.title && bannerObj.description) {
      if (bannerObj.toSlider && !sliderImage) {
        window.alert(
          'Додайте зображення, якщо бажаєте відобразити баннер на сайті'
        );
        return;
      }

      imagesToDelete.length && dispatch(deleteImagesFromCloud(imagesToDelete));
      const imageToSend = typenameRemover(sliderImage);

      dispatch(
        !editMode
          ? addBanner({ ...bannerObj, image: imageToSend })
          : updateBanner({ id, banner: { ...bannerObj, image: imageToSend } })
      );

      onResetInputs();
    } else {
      window.alert('Поля з "*" є обов‘язковими!');
    }
  };

  const onGoBack = () => {
    if (!window.confirm('Скасувати зміни?')) {
      return;
    }

    let notSavedImages;
    if (editMode) {
      const { image } = banner;
      const notSavedSliderImage =
        image && image.publicId === sliderImage.publicId ? null : sliderImage;
      notSavedImages = [notSavedSliderImage, ...imagesToDelete]
        .filter((val) => val)
        .map((img) => (img.publicId ? img.publicId : img));
    } else {
      notSavedImages = [sliderImage, ...imagesToDelete]
        .filter((val) => val)
        .map((img) => (img.publicId ? img.publicId : img));
    }

    notSavedImages.length && dispatch(deleteImagesFromCloud(notSavedImages));
    onResetInputs();
  };

  const onResetInputs = () => {
    setBannerObj({ ...BANNER_DEFAULT });
    dispatch(clearImagesState());
    dispatch(push('/banners'));
  };

  return (
    <Form className={'banner-redactor-container'}>
      <div className='banner-redactor'>
        <div className='banner-redactor__info'>
          <Form.Group>
            <Form.Label>*Заголовок:</Form.Label>
            <Form.Control
              name='title'
              type='text'
              placeholder='Введіть назву баннера'
              value={bannerObj.title || ''}
              onChange={onInputChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>*Опис:</Form.Label>
            <Form.Control
              as='textarea'
              rows='5'
              name='description'
              type='textarea'
              placeholder='Введіть опис баннеру'
              value={bannerObj.description || ''}
              onChange={onInputChange}
            />
          </Form.Group>
        </div>

        <SliderPlaceholder
          onCheckboxChange={onCheckboxChange}
          toSlider={bannerObj.toSlider}
        />
      </div>
      <RedactorButtons onSaveProduct={onSaveBanner} onGoBack={onGoBack} />
    </Form>
  );
};

export default BannerRedactor;
