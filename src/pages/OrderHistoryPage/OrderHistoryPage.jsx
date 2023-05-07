import * as userServices from "../../utilities/services/users";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import { useEffect } from "react";

export default function OrderHistoryPage() {
  async function handleCheckToken() {
    const expDate = await userServices.checkToken();

    console.log(expDate);
  }
  useEffect(async function () {
    async function getHistory() {}
  });

  return (
    <>
      <h1>OrderHistoryPage</h1>
      <OrderHistory />
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
    </>
  );
}
