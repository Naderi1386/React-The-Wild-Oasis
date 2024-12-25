import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

interface FilterButtonProp {
  active?: boolean;
}

const FilterButton = styled.button<FilterButtonProp>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface OptionType {
  lable: string;
  value: string;
}

interface FilterPropType {
  filterField: string;
  options: OptionType[];
}

const Filter = ({ filterField, options }: FilterPropType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterValue=searchParams.get(filterField) as string
  const handleClick = (value: string) => {
    searchParams.set(filterField, value);
    if(searchParams.get('page'))searchParams.set('page','1')
    setSearchParams(searchParams);
  };
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton disabled={option.value===filterValue} active={option.value===filterValue} key={option.value} onClick={() => handleClick(option.value)}>
          {option.lable}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
