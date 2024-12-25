import styled, { css } from "styled-components";


interface HeadingPropType{
    type?:'h1' | 'h2' | 'h3'
}

const Heading = styled.h1<HeadingPropType>`
  ${(prop) =>
    prop.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}
  ${(prop) =>
    prop.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    ${(prop) =>
    prop.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
`;

//  font-size: 3rem;
//       font-weight: 600;



export default Heading