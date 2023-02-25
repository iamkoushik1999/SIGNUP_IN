const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Sign Up
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ message: "User Signed In", user });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

// User Login
const logIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ message: "User Logged In", user });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
};

// User Delete
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  await user.remove();

  res.status(200).json({ message: "Deleted User", id: req.params.id });
};

// Get All User
const getUsers = async (req, res) => {
  const users = await User.find(req.body.name);

  res.status(200).json(users);
};

module.exports = {
  register,
  logIn,
  deleteUser,
  getUsers,
};
