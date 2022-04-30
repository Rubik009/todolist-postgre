const express = require("express");
const router = express.Router();
const TodoController = require('../controllers/todo.controller');
const authenticatToken = require('../middleware/auth');


router.post("/create",authenticatToken, async (req, res) => {
    try {
        const task = await TodoController.createTask(req.body);
        res.status(200).json({ message: 'Task added', task });
    } catch (err) {
        console.log({ message: err });
    }
});

router.get("/task",authenticatToken, async (req, res) => {
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

router.patch("/update",authenticatToken, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decodedtoken = JSON.parse(atob(token.split('.')[1]))
        const user = await TodoController.updateTaskByUser(decodedtoken.id, req.body.content);
        res.status(200).json({ message: "User updated!", user });

    } catch (err) {
        console.log({ message: err });
    }
})

router.delete("/delete",authenticatToken, async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decodedtoken = JSON.parse(atob(token.split('.')[1]))
        const user = await TodoController.deleteTaskByUser(decodedtoken.id, req.body.todo_id);
        res.status(200).json({ message: "User deleted!", user });

    } catch (err) {
        console.log({ message: err });
    }
})

module.exports = router;