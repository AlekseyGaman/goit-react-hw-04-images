import { ImageItem, ImageGalleryItemImage } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ id, imageLink, imageName, onImageClick }) => {
  return (
    <ImageItem onClick={onImageClick}>
      <ImageGalleryItemImage
        className="ImageGalleryItem-image"
        src={imageLink}
        alt={imageName}
        id={id}
      />
    </ImageItem>
  );
};

export default ImageGalleryItem;
