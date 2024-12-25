import Button from "../../ui/Button";
import { useCheckout } from "../bookings/useCheckout";
interface CheckoutButtonPropType {
  bookingId: number;
}

function CheckoutButton({ bookingId }: CheckoutButtonPropType) {
  const { checkOut, isCheckouting } = useCheckout();
  return (
    <Button
      disabled={isCheckouting}
      variations="primary"
      sizes="small"
      onClick={() =>
        checkOut({ id: bookingId, obj: { status: "checked-out" } })
      }
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
