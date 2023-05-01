const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    sortOrder: Number,
  },
  {
    timestamps: true,
  }
);
module.export = mongoose.model("Category", categorySchema);
