import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { DataBookingSelectedType } from "../../services/apiBookings";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

interface StatsPropType {
  booking: DataBookingSelectedType[];
  confirmedBooking: DataBookingSelectedType[];
  cabinCount: number;
  numNights: number;
}
function salesBookingsReduce(now: number, next: DataBookingSelectedType) {
  return now + Number(next.totalPrice);
}
const Stats = ({
  booking,
  confirmedBooking,
  cabinCount,
  numNights,
}: StatsPropType) => {
  const numBookings = booking.length;
  const sales = booking.reduce(salesBookingsReduce, 0);
  const checkins = confirmedBooking.length;

  const occupation = confirmedBooking.reduce(
    (now: number, next: DataBookingSelectedType) => now + next.numNights,
    0
  ) / (cabinCount * numNights)
  const finallOccupations = `${Math.round(occupation * 100)}%`;
  
 

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={String(numBookings)}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />{" "}
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={String(checkins)}
      />{" "}
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={finallOccupations}
      />
    </>
  );
};

export default Stats;
