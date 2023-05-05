import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import * as itemsAPI from "../../utilities/api/items";
import * as ordersAPI from "../../utilities/api/orders";

import "./NewOrderPage.css";
import Logo from "../../components/Logo/Logo";
import CatalogueList from "../../components/CatalogueList/CatalogueList";
import CategoryList from "../../components/CategoryList/CategoryList";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import UserLogOut from "../../components/UserLogOut/UserLogOut";

export default function NewOrderPage({ user, setUser }) {
  const [catalogueOfItems, setCatalogueOfItems] = useState([]);
  const [activeCat, setActiveCat] = useState("");
  const categoriesRef = useRef([]);
  const [cart, setCart] = useState();

  // useEffect(function () {
  //   console.log("NewOrderpage rendered");
  // });

  useEffect(async function () {
    async function getItems() {
      const items = await itemsAPI.getAll();
      categoriesRef.current = [
        ...new Set(items.map((item) => item.category.name)),
      ];
      setCatalogueOfItems(items);
      setActiveCat(categoriesRef.current[0]);
    }
    getItems();

    async function getCart() {
      const cart = await ordersAPI.getCart();
      setCart(cart);
    }
    getCart();
  }, []);

  return (
    <main className="NewOrderPage">
      <aside>
        <Logo />
        <CategoryList
          categories={categoriesRef.current}
          activeCat={activeCat}
          setActiveCat={setActiveCat}
        />
        <Link to="/orders" className="button btn-sm">
          ORDER HISTORY
        </Link>
        <UserLogOut user={user} setUser={setUser} />
        <CatalogueList
          catalogueOfItems={catalogueOfItems.filter(
            (item) => item.category.name === activeCat
          )}
          //catalogueOfItems={catalogueOfItem}
        />
        <OrderDetail order={cart} />
      </aside>
    </main>
  );
}
