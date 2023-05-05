const mongoose = require("mongoose");
const itemSchema = require("./itemSchema");
const Schema = mongoose.Schema;

const lineItemSchema = new Schema(
  {
    item: itemSchema,
    qty: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

lineItemSchema.virtual("extPrice").get(function () {
  return this.qty * this.item.price;
});

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    lineItems: [lineItemSchema],
    isPaid: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

orderSchema.virtual("orderTotal").get(function () {
  // add all the ext price values on the order's line items

  // long way of doing it (procedural programming)
  let total = 0;
  this.lineItems.forEach((li) => (total += li.extPrice));
  return total;

  // functional way
  // this.reduce((runningTotal, currentItem) => {
  //    return runningTotal + currentItem.extPrice
  // }, 0)
});
orderSchema.virtual("totalQty").get(function () {
  // add all the qty prop from the order's line items
  return this.lineItems.reduce((total, item) => total + item.qty, 0);
});
orderSchema.virtual("orderId").get(function () {
  // grab last 6 chars from the _id
  return this.id.slice(-6).toUpperCase();
});
orderSchema.statics.getCart = function (userId) {
  // 'this' is bound to the model (don't use an arrow function)
  // return the promise that resolves to a cart (the user's unpaid order)
  return this.findOneAndUpdate(
    // query
    { user: userId, isPaid: false },
    // update - in the case the order (cart) is upserted
    { user: userId },
    // upsert option creates the doc if it doesn't exist!
    { upsert: true, new: true }
  );
};
orderSchema.static.getPaidOrders = function (userId) {
  return this.find({ user: userId, isPaid: true });
};
orderSchema.methods.addItemToCart = async function (itemId) {
  const cart = this;

  const lineItem = cart.lineItems.find((li) => li.item._id.equals(itemId));

  if (lineItem) {
    // we already have this item in the cart
    lineItem.qty += 1;
  } else {
    // this item doesnt exist in the cart yet
    const item = await mongoose.model("Item").findById(itemId);
    cart.lineItems.push({ item });
  }

  return cart.save();
};
// orderSchema.methods.setItemQty = function(itemId, newQty){
//     const cart = this;
//     const lineItem = cart.lineItems.find(li => li.item._id.equals(itemId))
//     console.log('itemId', itemId)
//     console.log(cart)

//     if(lineItem && newQty < 1){
//         lineItem.remove()
//     }else if (lineItem){
//         lineItem.qty = newQty
//     }

//     return cart.save()
// }

orderSchema.methods.setItemQty = function (itemId, newQty) {
  // this keyword is bound to the cart (order doc)
  const cart = this;
  // Find the line item in the cart for the menu item
  const lineItem = cart.lineItems.find((lineItem) =>
    lineItem.item._id.equals(itemId)
  );
  if (lineItem && newQty <= 0) {
    // Calling remove, removes itself from the cart.lineItems array
    lineItem.remove();
  } else if (lineItem) {
    // Set the new qty - positive value is assured thanks to prev if
    lineItem.qty = newQty;
  }
  // return the save() method's promise
  return cart.save();
};

module.exports = mongoose.model("Order", orderSchema);
