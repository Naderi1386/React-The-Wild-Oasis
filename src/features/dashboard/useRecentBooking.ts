import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getBookingsAfterDate } from "../../services/apiBookings"

export const useRecentBookings=()=>{
    const [searchParams]=useSearchParams()
     const numDays=searchParams.get('last') || '7'
     const queryDate=subDays(new Date(),Number(numDays))
     const {isLoading,data:bookings}=useQuery({
        queryKey:['bookings',`last-${numDays}`],
        queryFn:()=>getBookingsAfterDate(queryDate)
     })
     return { isLoading, bookings };

}