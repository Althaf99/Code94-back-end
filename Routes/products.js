const express = require("express");
const product = require("../Controllers/product");
const router = express.Router();

// Correctly using the exported controller functions
router.get("/", product.getProducts);
router.post("/", product.addProduct);
router.patch("/:productId", product.updateProduct);
router.delete("/:productId", product.deleteProduct);

module.exports = router;
