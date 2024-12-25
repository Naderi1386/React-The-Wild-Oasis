import {
  cloneElement,
  createContext,
  ReactNode,
  useContext,

  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useModalClick from "../hooks/useModalClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const ModalButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
 
export interface ModalContextType {
  open: (open: string) => void;
  openName: string;
  close: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);
interface ModalPropType {
  children: ReactNode;
}

const Modal = ({ children }: ModalPropType) => {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = (open: string) => setOpenName(open);
  console.log(openName);
  
  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};
interface WindowPropType {
  children: ReactNode;
  name: string;
}

const Window = ({ children, name }: WindowPropType) => {
  const { openName, close: onClose } = useContext(
    ModalContext
  ) as ModalContextType;
  const { ref } = useModalClick<HTMLDivElement>(onClose);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal  ref={ref}>
        <ModalButton onClick={onClose}>
          <HiXMark />
        </ModalButton>
        <div>{cloneElement(children, { onCloseModal: onClose })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

interface OpenPropType {
  children: ReactNode;
  opens: string;
}

const Open = ({ children, opens: openWindowName }: OpenPropType) => {
  const { open } = useContext(ModalContext) as ModalContextType;
  return cloneElement(children, {
    onClick: () => {
      open(openWindowName);
    },
  });
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;