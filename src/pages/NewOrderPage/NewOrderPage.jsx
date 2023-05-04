import { useState, useEffect } from "react";
import * as itemsAPI from "../../utilities/api/items";
export default function NewOrderPage() {
  const [catalogueOfItems, setCatalogueOfItems] = useState([]);
  useEffect(function () {
    console.log("NewOrderpage rendered");
  });
  // useEffect(function () {
  //   console.log("useEffect runs only first render");
  // }, []);
  useEffect(async function () {
    async function getItems() {
      const items = await itemsAPI.getAll();
      setCatalogueOfItems(items);
    }
    getItems();
  }, []);
  return (
    <>
      <h1>NewOrderPage</h1>;
      <button onClick={catalogueOfItems}>Trigger render</button>
    </>
  );
}
