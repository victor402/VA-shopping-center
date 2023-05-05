import "./CatalogueListItem.css";

export default function CatalogueListItem({ catalogueOfItem }) {
  return (
    <div className="CatalogueListItem">
      <div className="emoji sign">{catalogueOfItem.emoji}</div>
      <div className="name">{catalogueOfItem.name}</div>
      <div className="purchase">
        <span>${catalogueOfItem.price.toFixed(2)}</span>
        <button className="btn-sm" onClick={() => console.log("clicked")}>
          ADD
        </button>
      </div>
    </div>
  );
}
