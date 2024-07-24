const Favorites = require("../Model/favorite");

const addFavorites = async (req, res) => {
  const { productId, userId } = req.body;

  // Validate required fields
  if (!productId || !userId) {
    return res.status(400).json({
      message: "productId and userId are required.",
    });
  }

  try {
    // Create a new product instance
    const newFavorite = new Favorites({
      productId,
      userId,
    });
    // Save the product to the database
    await newFavorite.save();

    // Send a response with the created product
    res.status(201).json(newFavorite);
  } catch (error) {
    // Handle duplicate SKU error or other validation errors
    if (error.code === 11000) {
      res.status(409).json({ message: "userId and productId must be unique" });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getFavorites = async (req, res) => {
  try {
    const products = await Favorites.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateFavorite = async (req, res) => {
  const productId = req.params.productId;
  const userId = req.params.userId;
  try {
    const updatedProduct = await products.findOneAndUpdate(
      { productId: productId, useId: userId },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFavorites = async (req, res) => {
  const { productId, userId } = req.body;
  try {
    await products.findOneAndDelete({ productId: productId, userId: userId });
    res.status(204).json({ message: "product deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getFavorites,
  updateFavorite,
  deleteFavorites,
  addFavorites,
};
