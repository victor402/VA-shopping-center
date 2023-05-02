import { useState, useEffect } from "react";
export default function NewOrderPage() {
  const [catalogueOfItems, setcatalogueOfItems] = useState([]);
  useEffect(function () {
    console.log("NewOrderpage rendered");
  });
  // useEffect(function () {
  //   console.log("useEffect runs only first render");
  // }, []);
  useEffect(async function () {
    async function getItems() {
      const items = await itemsAPI.getAll();
      setMenuItems(items);
    }
    getItems();
  }, []);
  return (
    <>
      <h1>NewOrderPage</h1>;
      <button onClick={catalogueOfMenuItems}>Trigger render</button>
    </>
  );
}
