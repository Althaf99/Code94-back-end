const User = require("../Model/user");

const addUser = async (req, res) => {
  const { userName, password } = req.body;

  // Validate required fields
  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: "Username and password  are required." });
  }

  try {
    // Create a new user instance
    const newUser = new User({
      userName,
      password,
    });
    // Save the user to the database
    await newUser.save();

    // Send a response with the created user
    res.status(201).json(newUser);
  } catch (error) {
    // Handle duplicate Username error or other validation errors
    if (error.code === 11000) {
      res.status(409).json({ message: "Username must be unique." });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const updatedProduct = await users.findOneAndUpdate(
      { userId: userId },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    await users.findOneAndDelete({ userId: userId });
    res.status(204).json({ message: "user deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  addUser,
  getUsers,
  updateUser,
  deleteUser,
};
