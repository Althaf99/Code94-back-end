const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = mongoose.Schema({
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
  productDescription: {
    type: String,
    required: true,
  },
});
productSchema.plugin(AutoIncrement, { inc_field: "productId" });

var product = mongoose.model("product", productSchema);
module.exports = product;
