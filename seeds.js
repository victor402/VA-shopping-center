require("dotenv").config();
require("./config/database");
const Category = require("./models/category");
const Item = require("./models/item");

(async function () {
  await Category.deleteMany({});
  const categories = await Category.create([
    { name: "Building", sortOrder: 15 },
    { name: "Electronics", sortOrder: 25 },
    { name: "Education", sortOrder: 35 },
    { name: "Gadget", sortOrder: 45 },
    { name: "Home", sortOrder: 55 },
  ]);
  await Item.deleteMany({});
  const items = await Item.create([
    { name: "Screw Driver", emoji: "🪛", category: categories[0], price: 2.99 },
    { name: "Hammer", emoji: "🔨", category: categories[0], price: 3.99 },
    { name: "wretch", emoji: "🔧", category: categories[0], price: 2.99 },
    { name: "Book", emoji: "📚", category: categories[2], price: 5.99 },
    { name: "pen", emoji: "🖊️", category: categories[2], price: 1.99 },
    { name: "phone", emoji: "📱", category: categories[3], price: 799.99 },
    { name: "laptop", emoji: "💻", category: categories[3], price: 1299.99 },
    { name: "spoon", emoji: "🥄", category: categories[4], price: 1.99 },
    { name: "plate", emoji: "🍴", category: categories[4], price: 1.99 },
    { name: "wire", emoji: "📷", category: categories[1], price: 299.99 },
  ]);
  console.log(items);
  process.exit();
});
