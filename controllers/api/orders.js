const Order = require("../../models/order");
const Item = require("../../models/item");

async function index(req, res, next) {
  const paidOrders = await Order.getPaidOrders(req.user._id);
  res.json(paidOrders);
}

// A cart is the unpaid order for a user
async function cart(req, res) {
  console.log("cartAPIHIT", req.user._id);
  // get a record for a user in the Order model
  // req.user.orders
  try {
    const cart = await Order.getCart(req.user._id);
    console.log(cart);

    res.json(cart);
  } catch (error) {
    console.error("i failed", error);
  }
}

// Add an item to the cart
async function addToCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  // The promise resolves to the document, which we already have
  // in the cart variable, so no need to create another variable...
  await cart.addItemToCart(req.params.id);
  return res.json(cart);
}

// Updates an item's qty in the cart
async function setItemQtyInCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  // The promise resolves to the document, which we already have
  // in the cart variable, so no need to create another variable...
  await cart.setItemQty(req.body.itemId, req.body.newQty);
  return res.json(cart);
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
  const cart = await Order.getCart(req.user._id);

  // normally in a real world setting, you would call you payment processing.
  // functions and when/if the payment is successfull, then we can update the cart/order
  // to isPaid

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
