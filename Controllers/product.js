const Product = require("../Model/productData");

const addProduct = async (req, res) => {
  const { productName, sku, price, productDescription } = req.body;

  // Validate required fields
  if (!productName || !sku || !price || !productDescription) {
    return res.status(400).json({
      message: "Name, SKU, price, product description and  are required.",
    });
  }

  try {
    // Create a new product instance
    const newProduct = new Product({
      productName,
      sku,
      price,
      productDescription,
    });
    // Save the product to the database
    await newProduct.save();

    // Send a response with the created product
    res.status(201).json(newProduct);
  } catch (error) {
    // Handle duplicate SKU error or other validation errors
    if (error.code === 11000) {
      res.status(409).json({ message: "SKU must be unique." });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const updatedProduct = await products.findOneAndUpdate(
      { productId: productId },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    await products.findOneAndDelete({ productId: productId });
    res.status(204).json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  getProducts,
  updateProduct,
  deleteProduct,
  addProduct,
};
