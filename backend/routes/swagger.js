// Keep document Spaces: 2

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
 * tags:
 *  name: Tasks
 *  description: The tasks managing API
 */

/**
 * @swagger
 * /api/tasks:
 *  get:
 *    summary: Returns the list of all the tasks
 *    tags: [Tasks]
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

/**
 * @swagger
 * /api/tasks/{id}:
 *  get:
 *    summary: Get the task by id
 *    tags: [Tasks]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The task id
 *    responses:
 *      200:
 *        description: The task description by id
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Task'
 *      404:
 *        description: The task was not found
 */

/**
 * @swagger
 * /api/tasks
 */
