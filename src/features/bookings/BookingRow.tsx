import styled from "styled-components";
import { format, isToday } from "date-fns";

import Table from "../../ui/Table";
import Tag from "../../ui/Tag";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { DataBookingType } from "../../services/apiBookings";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "./useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

interface BookingRowPropType {
  booking: DataBookingType;
}
type StatusType = "checked-in" | "checked-out" | "unconfirmed";

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}: BookingRowPropType) {
  const navigate = useNavigate();
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const { checkOut } = useCheckout();
  const { removeBooking, isDeleting } = useDeleteBooking();
  const realStatus: StatusType =
    status === "checked-in"
      ? "checked-in"
      : status === "checked-out"
      ? "checked-out"
      : "unconfirmed";

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[realStatus]}>
        {realStatus.replace("-", " ")}
      </Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.MenuButton
              onClick={() => navigate(`/bookings/${bookingId}`)}
              icon={<HiEye />}
            >
              See details
            </Menus.MenuButton>
            {realStatus === "unconfirmed" && (
              <Menus.MenuButton
                onClick={() => navigate(`/checkin/${bookingId}`)}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.MenuButton>
            )}
            {realStatus === "checked-in" && (
              <Menus.MenuButton
                onClick={() => {
                  checkOut({ id: bookingId, obj: { status: "checked-out" } });
                }}
                icon={<HiArrowUpOnSquare />}
              >
                Check out
              </Menus.MenuButton>
            )}
            <Modal.Open opens="delete-booking">
              <Menus.MenuButton
                icon={<HiTrash />}
                onClick={() => removeBooking(bookingId)}
              >
                Delete Booking
              </Menus.MenuButton>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete-booking">
          <ConfirmDelete
            resourceName={`booking #${bookingId}`}
            disabled={isDeleting}
            onConfirm={() => removeBooking(bookingId)}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
