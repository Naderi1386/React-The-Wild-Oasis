import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "../services/supabase"; // Ensure this is correctly initialized
import Button from "../ui/Button"; // Ensure Button component exists and is imported correctly
import { subtractDates } from "../utils/helpers"; // Make sure subtractDates is defined properly

import { bookings } from "./data-bookings"; // Ensure these data imports are valid
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) {
    console.log("Error deleting guests:", error.message);
  }
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) {
    console.log("Error deleting cabins:", error.message);
  }
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) {
    console.log("Error deleting bookings:", error.message);
  }
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) {
    console.log("Error creating guests:", error.message);
  }
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) {
    console.log("Error creating cabins:", error.message);
  }
}

async function createBookings() {
  try {
    const { data: guestsIds, error: guestsError } = await supabase
      .from("guests")
      .select("id")
      .order("id");

    if (guestsError) throw guestsError;

    const allGuestIds = guestsIds.map((guest) => guest.id);

    const { data: cabinsIds, error: cabinsError } = await supabase
      .from("cabins")
      .select("id")
      .order("id");

    if (cabinsError) throw cabinsError;

    const allCabinIds = cabinsIds.map((cabin) => cabin.id);

    const finalBookings = bookings.map((booking) => {
      const cabin = cabins.at(booking.cabinId - 1);
      const numNights = subtractDates(booking.endDate, booking.startDate);
      const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
      const extrasPrice = booking.hasBreakfast
        ? numNights * 15 * booking.numGuests
        : 0; // Hardcoded breakfast price
      const totalPrice = cabinPrice + extrasPrice;

      let status = "unconfirmed";
      if (
        isPast(new Date(booking.endDate)) &&
        !isToday(new Date(booking.endDate))
      ) {
        status = "checked-out";
      }
      if (
        isFuture(new Date(booking.startDate)) ||
        isToday(new Date(booking.startDate))
      ) {
        status = "unconfirmed";
      }
      if (
        (isFuture(new Date(booking.endDate)) ||
          isToday(new Date(booking.endDate))) &&
        isPast(new Date(booking.startDate)) &&
        !isToday(new Date(booking.startDate))
      ) {
        status = "checked-in";
      }

      return {
        ...booking,
        numNights,
        cabinPrice,
        extrasPrice,
        totalPrice,
        guestId: allGuestIds.at(booking.guestId - 1),
        cabinId: allCabinIds.at(booking.cabinId - 1),
        status,
      };
    });

    console.log(finalBookings);

    const { error } = await supabase.from("bookings").insert(finalBookings);
    if (error) {
      console.log("Error creating bookings:", error.message);
    }
  } catch (error) {
    console.log("Error in createBookings:", error.message);
  }
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);

    // Delete in order: bookings -> guests -> cabins
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Create in order: guests -> cabins -> bookings
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);

    await deleteBookings();
    await createBookings();

    setIsLoading(false);
  }
  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
