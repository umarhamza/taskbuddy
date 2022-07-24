const {
  findEmptyFields,
  errorResponse,
  isValidMongoId,
} = require("../helpers");
const { isEmpty } = require("lodash");

// login user
const loginUser = async (req, res) => {
  try {
    res.status(200).json({ msg: "login user" });
  } catch (error) {
    errorResponse({ res, error });
  }
};

// register user
const registerUser = async (req, res) => {
  try {
    res.status(200).json({ msg: "register user" });
  } catch (error) {
    errorResponse({ res, error });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
