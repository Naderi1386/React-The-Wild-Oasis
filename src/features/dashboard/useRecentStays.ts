import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last") || "7";
  const queryDate = subDays(new Date(), Number(numDays));
  const { isLoading, data:stays } = useQuery({
    queryKey: ["bookings", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });
  const confirmedStays = stays?.filter(
    (booking) =>
      booking.status === "checked-in" || booking.status === "checked-out"
  );
  
  return { isLoading, stays, confirmedStays,numDays };
};
