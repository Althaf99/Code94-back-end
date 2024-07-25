const express = require("express");
const product = require("../Controllers/product");
const router = express.Router();
const upload = require("../multerConfig");

// Correctly using the exported controller functions
router.get("/", product.getProducts);
router.post("/", upload.array("images", 5), product.addProduct);
router.put("/:id", upload.array("images", 5), product.updateProduct);
router.delete("/:id", product.deleteProduct);

module.exports = router;
