const Order = require("../../models/order");
const Item = require("../../models/item");

async function index(req, res, next) {
  const paidOrders = await Order.getPaidOrders(req.user._id);
  res.json(paidOrders);
}

async function cart(req, res) {
  console.log("cartAPIHIT", req.user._id);

  try {
    const cart = await Order.getCart(req.user._id);
    console.log(cart);

    res.json(cart);
  } catch (error) {
    console.error("i failed", error);
  }
}

async function addToCart(req, res) {
  const cart = await Order.getCart(req.user._id);

  await cart.addItemToCart(req.params.id);
  return res.json(cart);
}

async function setItemQtyInCart(req, res) {
  const cart = await Order.getCart(req.user._id);

  await cart.setItemQty(req.body.itemId, req.body.newQty);
  return res.json(cart);
}

async function checkout(req, res) {
  const cart = await Order.getCart(req.user._id);

  cart.isPaid = true;
  await cart.save();
  res.json(cart);
}

async function orderHistory(req, res) {
  try {
    const orders = await Order.find({ user: req.user._id, isPaid: true }).sort(
      "-updatedAt"
    );
    console.log(orders);
    res.json(orders);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  index,
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
  orderHistory,
};
