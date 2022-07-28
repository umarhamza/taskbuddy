const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { isEmpty } = require("lodash");
const {
  findEmptyFields,
  errorResponse,
  isValidMongoId,
} = require("../helpers");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    errorResponse({ res, error });
  }
};

// register user
const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const user = await User.register(fullname, email, password);

    // Create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    errorResponse({ res, error });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
