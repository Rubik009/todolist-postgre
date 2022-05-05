const express = require("express");
const router = express.Router();
const TodoController = require('../controllers/todo.controller');
const authenticatToken = require('../middleware/auth');

/**
 * @swagger
 * /api/todo/create:
 *  post:
 *      description: Add task to list
 *      tags:
 *        - Tasks
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name : authorization
 *          in : header
 *          type : string
 *          required : true 
 *        - in: body
 *          name: Task
 *          required: true
 *          description: Add object with properties
 *          schema:
 *              $ref: '#/definitions/Task'
 *      responses:
 *          '200':
 *              description: A succesful response               
 * definitions:
 *  Task:
 *      type: object
 *      required:
 *          - title
 *          - content
 *          - person_id
 *      properties:
 *          title: 
 *              type: string
 *          content: 
 *              type: string
 *          person_id: 
 *              type: string
 */
router.post("/create", authenticatToken, async (req, res) => {
    try {
        const task = await TodoController.createTask(req.body);
        res.status(200).json({ message: 'Task added', task });
    } catch (err) {
        console.log({ message: err });
    }
});


/**
 * @swagger
 * /api/todo/task:
 *  get:
 *      description: Use a request to get task of autorized user
 *      tags:
 *        - Tasks
 *      parameters:
 *      - name : authorization
 *        in : header
 *        type : string
 *        required : true 
 *      responses:
 *          '200':
 *              description: A succesful response
 */
router.get("/task", authenticatToken, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decodedtoken = JSON.parse(atob(token.split('.')[1]))
        const task = await TodoController.getTaskbyUser(decodedtoken.id);
        res.status(200).json({ message: 'List of user tasks', task });
    } catch (err) {
        console.log({ message: err });
    }
});


/**
 * @swagger
 * /api/todo/update:
 *  patch:
 *      description: Edit task in the list
 *      tags:
 *        - Tasks
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name : authorization
 *          in : header
 *          type : string
 *          required : true 
 *        - in: body
 *          name: Task
 *          required: true
 *          description: write title of task need to change and content to put instead of previous one
 *          schema:
 *              $ref: '#/definitions/Task'
 *      responses:
 *          '200':
 *              description: A succesful response
 * definitions:
 *  Task:
 *      type: object
 *      required:
 *          - todo_id
 *          - content
 *      properties:
 *          todo_id: 
 *              type: string
 *          content: 
 *              type: string
 */
router.patch("/update", authenticatToken, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decodedtoken = JSON.parse(atob(token.split('.')[1]))
        const user = await TodoController.updateTaskByUser(decodedtoken.id, req.body.title, req.body.content);
        res.status(200).json({ message: "User updated!", user });

    } catch (err) {
        console.log({ message: err });
    }
})


/**
 * @swagger
 * /api/todo/delete:
 *  delete:
 *      description: Delete task of the user
 *      tags:
 *        - Tasks
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name : authorization
 *          in : header
 *          type : string
 *          required : true 
 *        - in: body
 *          name: Task
 *          required: true
 *          description: write title of task need to delete
 *          schema:
 *              $ref: '#/definitions/Task'
 *      responses:
 *          '200':
 *              description: A succesful response
 * definitions:
 *  Task:
 *      type: object
 *      required:
 *          - title
 *      properties:
 *          title: 
 *              type: string
 */
router.delete("/delete", authenticatToken, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decodedtoken = JSON.parse(atob(token.split('.')[1]))
        const user = await TodoController.deleteTaskByUser(decodedtoken.id, req.body.title);
        res.status(200).json({ message: "User deleted!", user });

    } catch (err) {
        console.log({ message: err });
    }
})

module.exports = router;