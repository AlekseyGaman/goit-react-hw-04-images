import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalBackdrop, ModalContent, ModalImage } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModal, dataImage }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      e.preventDefault();
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  const handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  const { src, alt } = dataImage;

  return createPortal(
    <ModalBackdrop onClick={handleBackDrop}>
      <ModalContent>
        <ModalImage src={src} alt={alt} />
      </ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  dataImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  closeModal: PropTypes.func.isRequired,
};
