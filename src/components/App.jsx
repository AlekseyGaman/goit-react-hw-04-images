import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';
import { GlobalStyle } from 'components/GlobalStyle';
import Modal from './Modal';
import Searchbar from './Searchbar';
import fetchApi from './ImageApi';
import ImageGallery from './ImageGallery';

class App extends Component {
  state = {
    showModal: false,
    currentPage: 1,
    totalImages: 0,
    imageName: '',
    loaderVisible: false,
    modalData: {},
    images: [],
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.imageName !== this.state.imageName ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.getImage();
    }
  }

  fetchResponse = async () => {
    const response = await fetchApi(
      this.state.imageName,
      this.state.currentPage
    );
    this.setState({ totalImages: response.totalHits });
    if (this.state.currentPage === 1) {
      response.totalHits === 0
        ? toast.error("Oops, we didn't find anything")
        : toast.success(`Great, we found ${response.totalHits} images`);
    }
    return response;
  };

  getImage = async () => {
    try {
      this.setState({ loaderVisible: true });
      const response = await this.fetchResponse();
      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
      }));
    } catch {
      toast.error('Oops, try again');
    } finally {
      this.setState({ loaderVisible: false });
    }
  };

  findImage = word => {
    this.setState({ error: false });
    if (this.state.imageName !== word) {
      this.setState({ imageName: word, currentPage: 1, images: [] });
    }
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onImageClick = event => {
    this.toggleModal();

    const currentImage = Number(event.target.id);
    const currentItem = this.state.images.find(
      item => item.id === currentImage
    );
    const modalData = {
      src: currentItem.largeImageURL,
      alt: currentItem.tags,
    };
    this.setState({ modalData });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  render() {
    const { modalData, totalImages, images, showModal, loaderVisible } =
      this.state;

    const totalPages = Math.round(totalImages / images.length);

    return (
      <>
        <GlobalStyle />
        <Searchbar onSubmit={this.findImage} />
        {showModal && (
          <Modal dataImage={modalData} closeModal={this.toggleModal} />
        )}
        <ImageGallery images={images} onLargeImage={this.onImageClick} />
        {images.length !== 0 && totalPages !== 1 && (
          <button className="Button" onClick={this.loadMoreImages}></button>
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
  }
}

export default App;
