import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalBackdrop, ModalContent, ModalImage } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    e.preventDefault();

    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleBackDrop = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const { src, alt } = this.props.dataImage;

    return createPortal(
      <ModalBackdrop onClick={this.handleBackDrop}>
        <ModalContent>
          <ModalImage src={src} alt={alt} />
        </ModalContent>
      </ModalBackdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  dataImage: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }),
  closeModal: PropTypes.func.isRequired,
};
