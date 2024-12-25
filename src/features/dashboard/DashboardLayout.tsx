import styled from "styled-components";
import { useRecentBookings } from "./useRecentBooking";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays";
import Stats from "./Stats";
import { DataBookingSelectedType } from "../../services/apiBookings";
import useCabins from "../cabins/useGetCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isLoading: isLoading1, bookings } = useRecentBookings();
  const {
    isLoading: isLoading2,
    confirmedStays,
    numDays,
  } = useRecentStays();
  const { cabins, isLoading: isLoading3 } = useCabins();

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        numNights={Number(numDays)}
        cabinCount={cabins!.length}
        booking={bookings as DataBookingSelectedType[]}
        confirmedBooking={confirmedStays as DataBookingSelectedType[]}
      />
      <Today/>
      <DurationChart
        confirmedStays={confirmedStays as DataBookingSelectedType[]}
      />
      <SalesChart
        bookings={bookings as DataBookingSelectedType[]}
        numDays={numDays}
      />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
