import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FilterType, getBookings, SortType } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/Constenst";

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("status");
  const filter: FilterType =
    !filterValue || filterValue === "all"
      ? { field: "", value: "", method: "eq" }
      : { field: "status", value: filterValue, method: "eq" };

  const sort = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sort.split("-");

  const sortObj: SortType = {
    direction,
    field,
  };
  const page = Number(searchParams.get("page")) || 1;

  const { isLoading, data, error } = useQuery({
    queryKey: ["bookings", filterValue, sort, page],
    queryFn: () => getBookings(filter, sortObj, page),
  });
  const lastPage = Math.ceil(Number(data?.count) / PAGE_SIZE);

  if (page<lastPage-1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sort, page + 1],
      queryFn: () => getBookings(filter, sortObj, page + 1),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sort, page - 1],
      queryFn: () => getBookings(filter, sortObj, page - 1),
    });
  }

  return { isLoading, data, error };
};
