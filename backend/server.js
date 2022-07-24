require("dotenv").config();

const express = require("express");

// import mongoose
const mongoose = require("mongoose");

// import router from task routes
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users");

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// express app
const app = express();

// middleware
// check for body from any request and parse it...
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// connect to DB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
