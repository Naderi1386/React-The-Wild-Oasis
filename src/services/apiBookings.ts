import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/Constenst";

export interface BookingType {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinID: number;
  guestID: number;
}

export interface GuestType {
  id: number;
  created_at: string;
  fullName: string;
  email: string;
  nationalID: string;
  nationality: string;
  countryFlag: string;
  country:string
}

interface CabinSelected {
  name: string;
}
interface GuestSelected {
  fullName: string;
  email: string;
}

export interface DataBookingType {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinID: number;
  guestID: number;
  guests: GuestSelected;
  cabins: CabinSelected;
}
export interface DataBookingSelectedType {
  id: number;
  created_at: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: string;
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabinID: number;
  guestID: number;
  guests: GuestType;
  cabins: CabinSelected;
}
export interface FilterType {
  field: string;
  value: string;
  method: "gte" | "eq";
}
export interface SortType {
  field: string;
  direction: string;
}

export const getBookings = async (
  filter: FilterType,
  sort: SortType,
  page: number
) => {
  if (filter.value) {
    const from=(page * PAGE_SIZE) -PAGE_SIZE
    const to=from + PAGE_SIZE-1
    const {
      data: bookings,
      error,
      count,
    } = await supabase
      .from("bookings")
      .select("*,cabins(name),guests(fullName,email)", { count: "exact" })[filter.method](filter.field, filter.value).range(from,to)
      .order(sort.field, { ascending: sort.direction === "asc" });
    if (error) {
      console.error(error);
      throw new Error("Booking not found");
    }

    return { bookings, count };
  }

  if (!filter.value) {
    const from = page * PAGE_SIZE - PAGE_SIZE;

    const to = from + PAGE_SIZE-1;
    
    const {
      data: bookings,
      error,
      count,
    } = await supabase
      .from("bookings")
      .select("*,cabins(name),guests(fullName,email)", { count: "exact" })
      .range(from, to)
      .order(sort.field, { ascending: sort.direction === "asc" });

    if (error) {
      console.error(error);
      throw new Error("Booking not found");
    }

    return { bookings, count };
  }
};

export async function getBooking(id: number) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data as DataBookingSelectedType;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date:Date) {
  const { data, error } = await supabase
    .from("bookings")
    .select()
    .gte("created_at", date.toISOString())
    .lte("created_at", getToday({ end: true }));

  if (error) {
    
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data as DataBookingSelectedType[];
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date:Date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date.toISOString())
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data as DataBookingSelectedType[];
}

export interface TodayGuestType{
  id:number
  fullName:string
  nationality:string
  countryFlag:string
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}
export  interface UpdatedBooking {
  status?: "checked-in" | 'checked-out';
  isPaid?: true;
  hasBreakfast?: true;
  extrasPrice?: number;
  totalPrice?:number
}

interface UpdatingBookingType{
  id:number
  obj:UpdatedBooking
}
export async function updateBooking({id,obj}:UpdatingBookingType) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
