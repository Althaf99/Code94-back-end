// models/Favorite.js
const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("favorite", favoriteSchema);
