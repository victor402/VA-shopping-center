import "./OrderHistory.css";
import OrderItem from "../OrderItem/OrderItem";

export default function OrderHistory({
  orders,
  selectedOrder,
  setSelectedOrder,
}) {
  const orderItems = orders.map((o) => (
    <OrderItem
      order={o}
      isSelected={o === selectedOrder}
      setSelectedOrder={setSelectedOrder}
      key={o._id}
    />
  ));
  return <main className="OrderHistory">{orderItems}</main>;
}
