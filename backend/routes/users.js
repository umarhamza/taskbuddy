const express = require("express");

// constroller functions
const { loginUser, registerUser } = require("../controllers/userControllers");

const router = express.Router();

// Login route
router.post("/login", loginUser);

// Register route
router.post("/register", registerUser);

module.exports = router;
