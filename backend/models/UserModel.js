const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("All fields must be filled");

  const user = await this.findOne({ email });

  if (!user) throw Error("Incorrect credentials");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error("Incorrect credentials");

  return user;
};

// Static register method
userSchema.statics.register = async function (fullname, email, password) {
  // validation
  if (!email || !password) throw Error("All fields must be filled");
  if (!validator.isEmail(email)) throw Error("Not is not valid");
  if (!validator.isStrongPassword(password))
    throw Error("Password not strong enough");

  const exists = await this.findOne({ email });

  if (exists) throw Error("Email aleady in use!");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    fullname,
    email,
    password: hash,
  });

  return user;
};

module.exports = mongoose.model("User", userSchema);
