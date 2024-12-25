import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StylesHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const Header = () => {
  return (
    <StylesHeader>
      <UserAvatar/>
      <HeaderMenu/>
    </StylesHeader>
  );
};

export default Header;
