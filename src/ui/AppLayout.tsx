import {  Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";


const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: auto;
`;

const OutLetContainer = styled.div`
  max-width: 120rem;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const AppLayout = () => {
  return (
    <StyledDiv>
      <Sidebar />
      <Header />
      <Main >
        <OutLetContainer>
          <Outlet />
        </OutLetContainer>
      </Main>
    </StyledDiv>
  );
};

export default AppLayout;
