import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
  /*--- Event Handlers --- */
  async function handleAddToOrder(itemId) {
    const updatedCart = await ordersAPI.addItemToCart(itemId);
    setCart(updatedCart);
  }

  // Add this function
  async function handleChangeQty(itemId, newQty) {
    const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
    setCart(updatedCart);
  }

  // NewOrderPage.jsx

  async function handleCheckOut() {
    await ordersAPI.checkout();
    navigate("/orders");
  }

  return (
    <>
      <main>
        <div className="Header">
          <Logo />
          <CategoryList
            categories={categoriesRef.current}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
          />
        </div>
        <div className="NewOrderPage">
          {/* <div className="Header">
            <Logo />
            <CategoryList
              categories={categoriesRef.current}
              activeCat={activeCat}
              setActiveCat={setActiveCat}
            />
          </div> */}
          <aside>
            {/* <Logo />
            <CategoryList
              categories={categoriesRef.current}
              activeCat={activeCat}
              setActiveCat={setActiveCat}
            /> */}
            <Link to="/orders" className="button btn-sm">
              ORDER HISTORY
            </Link>
            <UserLogOut user={user} setUser={setUser} />
          </aside>

          <CatalogueList
            catalogueOfItems={catalogueOfItems.filter(
              (item) => item.category.name === activeCat
            )}
            handleAddToOrder={handleAddToOrder}
            //catalogueOfItems={catalogueOfItem}
          />
          <OrderDetail
            order={cart}
            handleChangeQty={handleChangeQty}
            handleCheckOut={handleCheckOut}
          />
        </div>
      </main>
    </>
  );
}
