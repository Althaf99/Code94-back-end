const express = require("express");
const favorite = require("../Controllers/favorites");
const router = express.Router();

// Correctly using the exported controller functions
router.get("/", favorite.getFavorites);
router.post("/add", favorite.addFavorites);
router.patch("/:productId", favorite.updateFavorite);
router.post("/remove", favorite.deleteFavorites);

module.exports = router;
