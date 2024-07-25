const Product = require("../Model/productData");
const fs = require("fs");

const addProduct = async (req, res) => {
  const { productName, sku, price, productDescription, qty, userId } = req.body;
  const files = req.files;

  // Validate required fields
  if (!productName || !sku || !price || !productDescription) {
    return res.status(400).json({
      message: "Name, SKU, price, and product description are required.",
    });
  }

  // Check if files are uploaded
  if (!files || files.length === 0) {
    return res.status(400).json({ message: "At least one image is required." });
  }

  try {
    // Get image file paths
    const imagePaths = files.map((file) => file.path);

    // Create a new product instance
    const newProduct = new Product({
      userId,
      productName,
      sku,
      price,
      productDescription,
      qty,
      images: imagePaths,
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

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const { productName, sku, price, productDescription, qty, userId } = req.body;
  const files = req.files;

  try {
    // Check if the product exists
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // If new images are uploaded, replace the old ones
    if (files && files.length > 0) {
      // Delete old images from the file system
      product.images.forEach((imagePath) => {
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error("Failed to delete image:", err);
          }
        });
      });

      // Add new images
      const imagePaths = files.map((file) => file.path);
      req.body.images = imagePaths;
    }

    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndDelete({ _id: productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Delete images from the file system
    product.images.forEach((imagePath) => {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image:", err);
        }
      });
    });

    res.status(204).json({ message: "Product deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
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

module.exports = {
  getProducts,
  updateProduct,
  deleteProduct,
  addProduct,
};
