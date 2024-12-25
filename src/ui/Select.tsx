import styled from "styled-components";

interface StyledSelectPropType{
  type:string
}

const StyledSelect = styled.select<StyledSelectPropType>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface OptionType {
  lable: string;
  value: string;
}
interface SelectPropType{
  options:OptionType[]
  value:string
  type:string
  onChange:(e:React.ChangeEvent<HTMLSelectElement>)=>void
}


const Select = ({options,onChange,value,...props}:SelectPropType) => {
  const {type}=props
  return (
    <StyledSelect type={type} onChange={onChange}>
      {options.map((option)=><option  key={option.value} selected={value===option.value}  value={option.value}>{option.lable}</option>)}

    </StyledSelect>
  )
}

export default Select
