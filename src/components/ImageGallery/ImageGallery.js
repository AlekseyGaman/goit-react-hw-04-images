import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryUl } from './ImageGallery.styled';

export const ImageGallery = ({ images, onLargeImage }) => {
  return (
    <ImageGalleryUl className="ImageGallery">
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
