import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  z-index: 1100;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  background-color: #ffffff;
  border-radius: 3px;
`;

export const ModalImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 85vh;
  z-index: 1100;
`;
