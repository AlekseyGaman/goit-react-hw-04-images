import PropTypes from 'prop-types';
import { ImageItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, imageLink, imageName, onImageClick }) => {
  return (
    <ImageItem onClick={onImageClick}>
      <ImageGalleryItemImage src={imageLink} alt={imageName} id={id} />
    </ImageItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  imageLink: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
