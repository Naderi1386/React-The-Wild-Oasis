import styled from "styled-components";
import BookingDataBox from "../bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Haeding";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { DataBookingSelectedType } from "../../services/apiBookings";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useCheckin";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [breakFast, setBreackFast] = useState(false);
  const { settings, isLoading: isLoadingSettings } = useSettings();
  useEffect(() => {
    if (booking?.isPaid) setConfirmPaid(booking.isPaid || false);
  }, [booking?.isPaid]);
  useEffect(() => {
    if (booking?.hasBreakfast) setBreackFast(booking.hasBreakfast || false);
  }, [booking?.hasBreakfast]);
  const { update, isCheckining } = useChecking();

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests: { fullName },
    totalPrice,
    numNights,
    numGuests,
    hasBreakfast,
  } = booking!;
  const optionalBreackfastPrice = Number(settings?.breakfastPrice) * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return null;
    if (breakFast) {
      update({
        id: bookingId,
        obj: {
          isPaid: true,
          status: "checked-in",
          hasBreakfast: true,
          extrasPrice: optionalBreackfastPrice,
          totalPrice:totalPrice+optionalBreackfastPrice
        },
      });
    } else {
      update({ id: bookingId, obj: { isPaid: true, status: "checked-in" } });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking as DataBookingSelectedType} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            disabled={false}
            checked={breakFast}
            onChange={() => {
              setBreackFast((br) => !br);
              setConfirmPaid(false);
            }}
            id={`${booking?.id}br`}
          >
            Want to add breakfast for {formatCurrency(optionalBreackfastPrice)}{" "}
            ?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          disabled={confirmPaid === true}
          checked={confirmPaid || isCheckining}
          onChange={() => setConfirmPaid((old) => !old)}
          id={String(bookingId)}
        >
          I confirm that {fullName} has paid the total amount of{" "}
          {!breakFast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreackfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreackfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckining}>
          Check in booking #{bookingId}
        </Button>

        <Button variations="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
