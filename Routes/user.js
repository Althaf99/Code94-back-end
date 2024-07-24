const express = require("express");
const user = require("../Controllers/user");
const router = express.Router();

// Correctly using the exported controller functions
router.get("/", user.getUsers);
router.post("/", user.addUser);
router.patch("/:userId", user.updateUser);
router.delete("/:userId", user.deleteUser);

module.exports = router;
