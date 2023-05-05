import "./LineItem.css";

export default function LineItem({
  lineItem: {
    item: { emoji, name, _id, price },
    qty,
    extPrice,
  },
  isPaid,
  handleChangeQty,
}) {
  return (
    <div className="LineItem">
      <div className="flex-ctr-ctr">{emoji}</div>
      <div className="flex-ctr-ctr flex-col">
        <span className="align-ctr">{name}</span>
        <span>{price.toFixed(2)}</span>
      </div>
      <div className="qty" style={{ justifyContent: isPaid && "center" }}>
        {!isPaid && (
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(_id, qty - 1)}
          >
            −
          </button>
        )}
        <span>{qty}</span>
        {!isPaid && (
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(_id, qty + 1)}
          >
            +
          </button>
        )}
      </div>
      <div className="ext-price">${extPrice.toFixed(2)}</div>
    </div>
  );
}
