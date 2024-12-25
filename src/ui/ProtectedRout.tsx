import { ReactNode, useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
const FullPage = styled.div`
  background-color: var(--color-grey-50);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface ProtectedRout {
  children: ReactNode;
}
const ProtectedRout = ({ children }: ProtectedRout) => {
    const queryClient=useQueryClient()
  const { isLoading, isAuthenticated,user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
   
    if (!isAuthenticated && !isLoading && !user) navigate("/login");
  }, [isAuthenticated, navigate,isLoading,queryClient,user]);


  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return children;
};

export default ProtectedRout;
