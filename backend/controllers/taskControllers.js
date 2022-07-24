const Task = require('../models/TaskModel');
const mongoose = require('mongoose');
var { isEmpty } = require('lodash');

// Error response
const errorResponse = ({ res, error = null, message, status = 400 }) => {
  const msg = message ?? error.message;
  if (error) console.log(error);
  return res.status(status).json({ msg });
};

// Is Mongo ID valid
const isValidMongoId = ({
  id,
  res,
  message = 'Incorrect ID. No task found!',
}) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    errorResponse({ res, message });
    return true;
  }
  return false;
};

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
    if (!task) return errorResponse({ res, message: 'No such task!' });

    // Return task
    res.status(200).json(task);
  } catch (error) {
    errorResponse({ res, error });
  }
};

const findEmptyFields = (fields, requiredFields) => {
  const emptyFields = [];

  for (const field in fields) {
    if (Object.hasOwnProperty.call(fields, field)) {
      const element = fields[field];
      if (requiredFields.includes(field) && isEmpty(field))
        emptyFields.push(field);
    }
  }

  return emptyFields;
};

// CREATE new task
const createTask = async (req, res) => {
  const { title, notes, status, order } = req.body;

  // Check for empty fields
  const emptyFields = findEmptyFields(req.body, ['title', 'status']);
  console.log('emptyFields', emptyFields);
  // if (emptyFields.length > 0) return res.status(400).json({msg: "Please fill in all required fields", emptyFields})

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
    if (!task) return errorResponse({ res, message: 'No such task!' });

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
    if (!task) return errorResponse({ res, message: 'No such task!' });
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
