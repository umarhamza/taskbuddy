require("dotenv").config();

const express = require("express");

// import mongoose
const mongoose = require("mongoose");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

// import router from task routes
const taskRoutes = require("./routes/tasks");
const userRoutes = require("./routes/users");

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple express lib API",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);

// express app
const app = express();

// Add Swagger middleware
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

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
