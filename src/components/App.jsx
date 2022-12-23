/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';
import { GlobalStyle } from 'components/GlobalStyle';
import Modal from './Modal';
import Searchbar from './Searchbar';
import fetchApi from './ImageApi';
import ImageGallery from './ImageGallery';
import Button from './Button';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [imageName, setImageName] = useState('');
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!imageName) {
      return;
    }
    const getImage = async () => {
      try {
        setLoaderVisible(true);
        const response = await fetchApi(imageName, currentPage);
        setImages(prevImages => [...prevImages, ...response.hits]);
        setTotalImages(response.totalHits);
        if (currentPage === 1) {
          response.totalHits === 0
            ? toast.error("Oops, we didn't find anything")
            : toast.success(`Great, we found ${response.totalHits} images`);
        }
      } catch {
        toast.error('Щops something wrong - try again');
      } finally {
        setLoaderVisible(false);
      }
    };
    getImage();
  }, [imageName, currentPage]);

  function findImage(word) {
    if (imageName !== word) {
      setImageName(word);
      setCurrentPage(1);
      setImages([]);
    }
  }

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const onImageClick = event => {
    toggleModal();

    const currentImage = Number(event.target.id);
    const currentItem = images.find(item => item.id === currentImage);
    const modalData = {
      src: currentItem.largeImageURL,
      alt: currentItem.tags,
    };
    setModalData(modalData);
  };

  const loadMoreImages = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const totalPages = Math.round(totalImages / images.length);

  return (
    <>
      <GlobalStyle />
      <Searchbar onSubmit={findImage} />
      {showModal && <Modal dataImage={modalData} closeModal={toggleModal} />}
      <ImageGallery images={images} onLargeImage={onImageClick} />
      {images.length !== 0 && totalPages !== 1 && (
        <Button onClick={loadMoreImages} />
      )}
      {loaderVisible && (
        <ThreeDots
          color="#212121"
          ariaLabel="three-dots-loading"
          wrapperStyle={{ justifyContent: 'center' }}
        />
      )}
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default App;
