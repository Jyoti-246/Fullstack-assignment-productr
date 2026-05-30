const mongosse = require("mongoose");

const productSchema = new mongosse.Schema({
  name: String,
  type: String,
  quantityStock: Number,
  mrp: Number,
  sellingPrice: Number,
  brandName: String,
  exchangeEligibility: String,
  published: Boolean,
  images: [String],
});

module.exports = mongosse.model("Product", productSchema);
