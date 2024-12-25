import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import BookingRow from "./BookingRow";
import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import Spinner from "../../ui/Spinner";
import { DataBookingType } from "../../services/apiBookings";
import Pagination from "../../ui/Pagination";

function BookingTable() {
  const { data, isLoading } = useBookings();
  const realBookings = data?.bookings as DataBookingType[];
  const count = data?.count as number;

  if (isLoading) return <Spinner />;
  if (!realBookings.length) return <Empty resource="Bookings" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          dataType="booking"
          data={realBookings}
          renderBookings={(booking: DataBookingType) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
