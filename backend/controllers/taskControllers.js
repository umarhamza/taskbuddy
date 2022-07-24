const Task = require("../models/TaskModel");
const mongoose = require("mongoose");
const {
  findEmptyFields,
  errorResponse,
  isValidMongoId,
} = require("../helpers");
const { isEmpty } = require("lodash");

// GET all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ order: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    errorResponse({ res, error });
  }
};

// GET a single task
const getTask = async (req, res) => {
  const { id } = req.params;

  // Check if the mongoId is valid Mongo id
  if (isValidMongoId({ id, res })) {
    return;
  }

  try {
    const task = await Task.findById(id);

    // If no task found, return 404
    if (!task) return errorResponse({ res, message: "No such task!" });

    // Return task
    res.status(200).json(task);
  } catch (error) {
    errorResponse({ res, error });
  }
};

// CREATE new task
const createTask = async (req, res) => {
  const { title, notes, status, order } = req.body;

  // If required fields are empty, return an error with empty fields
  const emptyFields = findEmptyFields(req.body);
  if (!isEmpty(emptyFields))
    return res.status(400).json({
      msg: "Please fill in all required fields",
      options: { emptyFields },
    });

  // Add doc to DB
  try {
    const task = await Task.create({
      title,
      notes,
      status,
      order,
    });
    res.status(200).json(task);
  } catch (error) {
    errorResponse({ res, error });
  }
};

// DELETE a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  // make sure its a valid id
  if (isValidMongoId({ id, res })) {
    return;
  }

  try {
    const task = await Task.findOneAndDelete({ _id: id });

    // If no task found
    if (!task) return errorResponse({ res, message: "No such task!" });

    res.status(200).json({ _id: task._id });
  } catch (error) {
    errorResponse({ res, error });
  }
};

// UPDATE a task
const updateTask = async (req, res) => {
  const { id } = req.params;

  // make sure its a valid id
  if (isValidMongoId({ id, res })) {
    return;
  }

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    );
    // If no task found, return 404
    if (!task) return errorResponse({ res, message: "No such task!" });
    res.status(200).json({ _id: task._id, updatedAt: task.updatedAt });
  } catch (error) {
    errorResponse({ res, error });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
};
