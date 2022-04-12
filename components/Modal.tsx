import React, { useEffect, useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import styled from "@emotion/styled";
import {
  StyledModalOverlay,
  StyledModal,
  StyledModalHeader,
  StyledModalBody,
  StyledTitle,
  StyledCloseButton,
} from "../styled";

type PropsType = {
  title: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<PropsType> = ({
  show,
  onClose,
  children,
  title,
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: any) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <StyledCloseButton onClick={handleCloseClick}>x</StyledCloseButton>
        </StyledModalHeader>
        <StyledTitle>{title}</StyledTitle>
        <StyledModalBody>{children}</StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.querySelector("#modal-root")!
    );
  } else {
    return null;
  }
};

export default Modal;
