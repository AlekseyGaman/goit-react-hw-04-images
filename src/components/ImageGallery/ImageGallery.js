import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUl } from './ImageGallery.styled';

const ImageGallery = ({ images, onLargeImage }) => {
  return (
    <ImageGalleryUl>
      {images.map(el => (
        <ImageGalleryItem
          key={el.id}
          id={el.id}
          imageLink={el.webformatURL}
          imageName={el.tags}
          onImageClick={onLargeImage}
        />
      ))}
    </ImageGalleryUl>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onLargeImage: PropTypes.func.isRequired,
};
