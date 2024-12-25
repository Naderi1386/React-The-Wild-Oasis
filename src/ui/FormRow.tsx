import { ReactNode } from "react";

import styled, { css } from "styled-components";
interface StyledFormRowPropType {
  isgrid: boolean;
}
const StyledFormRow = styled.div<StyledFormRowPropType>`
  ${(props) =>
    props.isgrid &&
    css`
      display: grid;

      align-items: center;
      grid-template-columns: 24rem 1fr 1.2fr;
      gap: 2.4rem;
    `}

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  margin-bottom: 0.7rem;
  text-align: start;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface FormRowPropType {
  lable?: string;
  children: ReactNode;
  error?: string;
  isgrid: boolean;
}

interface PropType {
  id: string;
}
interface CType {
  props: PropType;
}

const FormRow = ({
  lable,
  children,
  error,
  isgrid = true,
}: FormRowPropType) => {
  const c = children as CType;

  return (
    <StyledFormRow isgrid={isgrid}>
      {lable && <Label htmlFor={c.props ? c.props.id : ""}>{lable}</Label>}
      {children}
      {error && <Error>{error as string}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;
