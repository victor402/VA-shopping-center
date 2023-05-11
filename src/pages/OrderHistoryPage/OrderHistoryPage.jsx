import * as ordersAPI from "../../utilities/api/orders";
import { Link } from "react-router-dom";
import "./OrderHistoryPage.css";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import { useState, useEffect } from "react";
import Logo from "../../components/Logo/Logo";
import UserLogOut from "../../components/UserLogOut/UserLogOut";
import OrderDetail from "../../components/OrderDetail/OrderDetail";

export default function OrderHistoryPage({ user, setUser }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(function () {
    async function getOrders() {
      console.log("useeffect running");

      const orders = await ordersAPI.getAllOrderHistory();
      console.log(orders);

      setOrders(orders);
      setSelectedOrder(orders[0]);
    }
    getOrders();
  }, []);

  // async function handleCheckToken() {
  //   const expDate = await userServices.checkToken();

  //   console.log(expDate);
  // }
  // useEffect(async function () {
  //   async function getHistory() {}
  // });

  return (
    <main className="OrderHistoryPage">
      <aside>
        <Logo />
        <Link to="/orders/new" className="button btn-sm">
          ORDER
        </Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <OrderHistory
        orders={orders}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
      <OrderDetail order={selectedOrder} />
    </main>
  );
}
