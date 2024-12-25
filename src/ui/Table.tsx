import { createContext, ReactNode, useContext } from "react";
import styled from "styled-components";
import { CabinType } from "../services/apiCabins";
import {  DataBookingType } from "../services/apiBookings";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

interface CommonRowPropType {
  columns: string;
}

const CommonRow = styled.div<CommonRowPropType>`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

interface TablePropType {
  children: ReactNode;
  columns: string;
}

interface TableContextType {
  columns: string;
}

const TableContext = createContext<null | TableContextType>(null);

const Table = ({ children, columns }: TablePropType) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
};
interface HeaderPropType {
  children: ReactNode;
}

const Header = ({ children }: HeaderPropType) => {
  const { columns } = useContext(TableContext) as TableContextType;
  return (
    <StyledHeader role="row" columns={`${columns}`} as={"header"}>
      {children}
    </StyledHeader>
  );
};

interface RowPropType {
  children: ReactNode;
}

const Row = ({ children }: RowPropType) => {
  const { columns } = useContext(TableContext) as TableContextType;
  return (
    <StyledRow role="row" columns={`${columns}`}>
      {children}
    </StyledRow>
  );
};

interface BodyPropType {
  renderCabin?:
     ((data: CabinType) => false | JSX.Element)
    
  data: CabinType[]  | DataBookingType[];
  dataType: "cabin" | "booking";
  renderBookings?:(data:DataBookingType)=>JSX.Element
  
}

const Body = ({ renderCabin,renderBookings, data, dataType }: BodyPropType) => {
  if (!data?.length) return <Empty>No data to show at the moment</Empty>;
  const cabinItems = data as CabinType[];
  const bookingsItems = data as DataBookingType[];

  return (
    <StyledBody>
        {(dataType==='cabin' && renderCabin) && cabinItems.map(renderCabin) }
        {(dataType==='booking' && renderBookings) && bookingsItems.map(renderBookings)}
    </StyledBody>
  );
};

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
