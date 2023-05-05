import "./CatalogueList.css";
import CatalogueListItem from "../CatalogueListItem/CatalogueListItem";

export default function CatalogueList({ catalogueOfItems }) {
  const items = catalogueOfItems.map((item) => (
    <CatalogueListItem key={item._id} catalogueOfItem={item} />
  ));
  return <main className="CatalogueList">{items}</main>;
}
