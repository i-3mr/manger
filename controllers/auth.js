// authentication controllers

const User = require("../models/User");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) throw new Error("Please provide email and password");

  const user = await User.findOne({
    email,
  });

  if (!user) throw new Error("User not found");

  await user.checkPassword(password);

  const token = user.createToken();

  res.status(200).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,

    message: `مرحباً ${user.name}`,
  });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name)
    throw new Error("Please provide all fields, name, email and password");

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.createToken();

  res.status(201).json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    token,

    message: `مرحباً ${user.name}`,
  });
};

module.exports = {
  login,
  register,
};
