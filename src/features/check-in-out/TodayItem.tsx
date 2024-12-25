import styled from "styled-components";
import {
  DataBookingSelectedType,
  
} from "../../services/apiBookings";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";

import { useNavigate } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

interface TodayItemPropType {
  activity: DataBookingSelectedType;
}
const TodayItem = ({ activity }: TodayItemPropType) => {
  const { id, numNights, guests, status } = activity;
  const navigate=useNavigate()

  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.countryFlag} alt={`flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights}</div>
      {status === "unconfirmed" ? (
        <Button sizes="small" onClick={() => navigate(`checkin/${id}`)}>
          Check In
        </Button>
      ) : (
        <CheckoutButton bookingId={id}/>
      )}
    </StyledTodayItem>
  );
};

export default TodayItem;
