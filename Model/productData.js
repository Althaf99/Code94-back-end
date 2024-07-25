const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = mongoose.Schema({
  userId: {
    type: Number,
  },
  productId: {
    type: Number,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  qty: String,
  productDescription: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
    },
  ], // Add images field to store image paths
});

productSchema.plugin(AutoIncrement, { inc_field: "productId" });

var product = mongoose.model("product", productSchema);
module.exports = product;
