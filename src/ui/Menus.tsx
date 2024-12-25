import { createContext, ReactNode, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import useModalClick from "../hooks/useModalClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;
interface PositionType {
  x: string;
  y: string;
}

interface StyledListPropType {
  position: PositionType;
}

const StyledList = styled.ul<StyledListPropType>`
  position: absolute;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
export interface MenusContextType {
  openId: number;
  setOpenId: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  position: PositionType;
  setPosition: React.Dispatch<React.SetStateAction<PositionType>>;
}

export const MenusContext = createContext<MenusContextType | null>(null);

interface MenusPropType {
  children: ReactNode;
}

const Menus = ({ children }: MenusPropType) => {
  const [openId, setOpenId] = useState(0);
  const [position, setPosition] = useState<PositionType>({ x: "0", y: "0" });
  const onClose = () => setOpenId(0);

  return (
    <MenusContext.Provider
      value={{ openId, setOpenId, onClose, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

interface TogglePropType {
  id: number;
}

const Toggle = ({ id }: TogglePropType) => {
  const { setOpenId, onClose, openId, setPosition } = useContext(
    MenusContext
  ) as MenusContextType;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();

    setPosition({
      x: String(window.innerWidth - Number(rect?.width) - Number(rect?.x)),
      y: String(Number(rect?.y) + Number(rect?.height) + 8),
    });

    if (openId !== id) setOpenId(id);
    if (openId === id) onClose();
  };
  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

interface ListPropType {
  id: number;
  children: ReactNode;
}
const List = ({ id, children }: ListPropType) => {
  const { openId, position, onClose } = useContext(
    MenusContext
  ) as MenusContextType;
  const { ref } = useModalClick<HTMLUListElement>(onClose,false);
  

  if (openId !== id) return null;

  return createPortal(
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>,
    document.body
  );
};

interface ButtonPropType {
  children: ReactNode;
  icon: JSX.Element;
  onClick?: () => void;
}

const MenuButton = ({ children, icon, onClick }: ButtonPropType) => {
  const { onClose } = useContext(MenusContext) as MenusContextType;
  const handleClick = () => {
    onClick?.();

    onClose();
  };
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>{" "}
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.MenuButton = MenuButton;
Menus.List = List;
Menus.Toggle = Toggle;

export default Menus;
