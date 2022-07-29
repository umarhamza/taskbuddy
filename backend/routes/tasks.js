const express = require("express");

// import controllers
const {
  createTask,
  getTasks,
  getTask,
  deleteTask,
  updateTask,
} = require("../controllers/taskControllers");

// express router
// attach routes to router below
const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Task:
 *      type: object
 *      required:
 *        - title
 *        - notes
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the task
 *        title:
 *          type: string
 *          description: The task title
 *        notes:
 *          type: string
 *          description: The task notes
 *      example:
 *        id: d5fe_azf
 *        title: Start working on API
 *        notes: I need to create Swagger docs for my API
 *
 */

/**
 * @swagger
 * /api/tasks:
 *  get:
 *    summary: Returns the list of all the tasks
 *    responses:
 *      200:
 *        description: The list of the tasks
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Task'
 */

// This is to get all tasks
router.get("/", getTasks);

// GET a single task
router.get("/:id", getTask);

// POST a new task
router.post("/", createTask);

// DELETE a task
router.delete("/:id", deleteTask);

// UPDATE a task
router.patch("/:id", updateTask);

// export router
module.exports = router;
