import "./OrderItem.css";
export default function OrderItem({ order, isSelected, setSelectedOrder }) {
  return (
    <div
      className={`OrderItem${isSelected ? " selected" : ""}`}
      onClick={() => setSelectedOrder(order)}
    >
      <div>
        <div>
          Order Id:<span className="smaller">{order.orderId}</span>
        </div>
        <div className="smaller">
          {new Date(order.createdAt).toLocaleDateString()}
        </div>
      </div>
      <div className="align-rt">
        <div>${order.orderTotal.toFixed(2)}</div>
        <div className="smaller">
          {order.totaliQty} Item{order.totalQty > 1 && "s"}
        </div>
      </div>
    </div>
  );
}
