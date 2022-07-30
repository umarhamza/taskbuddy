const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { isEmpty } = require("lodash");
const {
  findEmptyFields,
  errorResponse,
  isValidMongoId,
} = require("../helpers");

/**
 * @TODO
 * Add express validator to add middleware to each route
 */

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  const requiredFields = ["email", "password"];
  const { email, password } = req.body;

  // If required fields are empty, return an error with empty fields
  const emptyFields = findEmptyFields(req.body, requiredFields);
  if (!isEmpty(emptyFields))
    return res.status(400).json({
      msg: "Please fill in all required fields",
      options: { emptyFields },
    });

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
  const requiredFields = ["fullname", "email", "password"];
  const { fullname, email, password } = req.body;

  // If required fields are empty, return an error with empty fields
  const emptyFields = findEmptyFields(req.body, requiredFields);
  if (!isEmpty(emptyFields))
    return res.status(400).json({
      msg: "Please fill in all required fields",
      options: { emptyFields },
    });

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
