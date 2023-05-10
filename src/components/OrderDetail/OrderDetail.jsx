import "./OrderDetail.css";
import LineItem from "../LineItem/LineItem";

export default function OrderDetail({
  order,
  handleChangeQty,
  handleCheckOut,
}) {
  if (!order) return null;
  const lineItems = order.lineItems.map((item) => (
    <LineItem
      handleChangeQty={handleChangeQty}
      lineItem={item}
      isPaid={order.isPaid}
      key={item._id}
    />
  ));
  return (
    <div className="OrderDetail">
      {" "}
      Order
      <div className="heading-section">
        {order.isPaid ? (
          <span>
            ORDER <span className="smaller">{order.orderId}</span>
          </span>
        ) : (
          <span>NEW ORDER</span>
        )}
        <span>{new Date(order.updatedAt).toLocaleDateString()}</span>
      </div>
      <div className="line-item-container flex-ctr-ctr flex-col scroll-y">
        {lineItems.length ? (
          <>
            {lineItems}
            <section className="total">
              {order.isPaid ? (
                <span className="right">TOTAL&nbsp;&nbsp;</span>
              ) : (
                <button
                  className="btn-sm"
                  onClick={handleCheckOut}
                  disabled={!lineItems.length}
                >
                  CHECKOUT
                </button>
              )}
              <span>{order.totalQty}</span>
              <span className="right">${order.orderTotal.toFixed(2)}</span>
            </section>
          </>
        ) : (
          <div className="hungry">shop?</div>
        )}
      </div>
    </div>
  );
}
