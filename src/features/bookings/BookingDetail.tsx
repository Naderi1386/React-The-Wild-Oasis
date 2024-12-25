import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Haeding";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { DataBookingSelectedType } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "./useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isLoading, booking } = useBooking();
  const moveBack = useMoveBack();
  const { checkOut, isCheckouting } = useCheckout();
  const { isDeleting, removeBooking } = useDeleteBooking();
  if (isLoading) return <Spinner />;
  if (booking === undefined) return <Empty resource="Booking" />;
  const { status, id } = booking!;
  const Status =
    status === "checked-in"
      ? "checked-in"
      : status === "checked-out"
      ? "checked-out"
      : "unconfirmed";

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[Status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking as DataBookingSelectedType} />

      <ButtonGroup>
        {Status === "checked-in" && (
          <Button
            variations="secondary"
            onClick={() => checkOut({ id: id, obj: { status: "checked-out" } })}
            disabled={isCheckouting}
          >
            {" "}
            Check out
          </Button>
        )}
        {Status === "unconfirmed" && (
          <Button
            variations="secondary"
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Check in
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete-booking">
            <Button variations="danger">Delete Booking</Button>
          </Modal.Open>
          <Modal.Window name="delete-booking">
            <ConfirmDelete
              resourceName={`booking #${id}`}
              disabled={isDeleting}
              onConfirm={() => removeBooking(id)}
            />
          </Modal.Window>
        </Modal>
        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
