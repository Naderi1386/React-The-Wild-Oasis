import styled, { css } from "styled-components"

interface RowPropType{
    type?:'horizontal' | 'vertical'
}

const Row =styled.div<RowPropType>`
    display: flex;
    ${(prop)=>prop.type==='horizontal' && css`
        align-items: center;
        justify-content: space-between;
    `}
    ${(prop)=>prop.type==='vertical' && css`
        flex-direction: column;
        gap: 1.2rem;
    `}
    
`

Row.defaultProps={
    type:'vertical'
}

export default Row