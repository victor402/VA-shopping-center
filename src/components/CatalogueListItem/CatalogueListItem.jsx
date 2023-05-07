import "./CatalogueListItem.css";

export default function CatalogueListItem({
  catalogueOfItem,
  handleAddToOrder,
}) {
  return (
    <div className="CatalogueListItem">
      <div className="emoji sign">{catalogueOfItem.emoji}</div>
      <div className="name">{catalogueOfItem.name}</div>
      <div className="purchase">
        <span>${catalogueOfItem.price.toFixed(2)}</span>
        <button
          className="btn-sm"
          onClick={() => handleAddToOrder(catalogueOfItem._id)}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
