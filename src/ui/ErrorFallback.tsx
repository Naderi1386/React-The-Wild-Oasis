import styled from "styled-components";
import Heading from "./Haeding";
import { FallbackProps } from "react-error-boundary";
import GlobalStyles from "../styles/GlobalStyle";
import Button from "./Button";

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

interface ErrorFallbackPropType {
  error: FallbackProps['error'];
  resetErrorBoundary:()=>void
}


const ErrorFallback = ({ error,resetErrorBoundary }: ErrorFallbackPropType) => {
  

  return (
    <StyledErrorFallback>
      <Box>
        <Heading as={"h1"}>Something Went Wrong 🧐</Heading>
        <p>{String(error.message)}</p>
          <Button sizes="large" variations="primary" onClick={resetErrorBoundary}>
            Try again
          </Button>
      </Box>
      <GlobalStyles>

      <div>

      </div>
      </GlobalStyles>
    </StyledErrorFallback>
  );
};

export default ErrorFallback;
