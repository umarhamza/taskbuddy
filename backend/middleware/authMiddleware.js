const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const authRoute = asyncHandler(async (req, res, next) => {
  let token;
  const authorization = req.headers?.authorization;

  if (authorization && authorization?.startsWith("Bearer")) {
    try {
      // set token from header
      token = authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.SECRET);

      // get user from token
      req.user = await User.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ msg: "Not authorized, no token" });
  }
});

module.exports = { authRoute };
