import "./CatalogueList.css";
import CatalogueListItem from "../CatalogueListItem/CatalogueListItem";

export default function CatalogueList({ catalogueOfItems, handleAddToOrder }) {
  const items = catalogueOfItems.map((item) => (
    <CatalogueListItem
      key={item._id}
      catalogueOfItem={item}
      handleAddToOrder={handleAddToOrder}
    />
  ));
  return <main className="CatalogueList">{items}</main>;
}
