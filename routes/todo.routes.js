const express = require("express");
const router = express.Router();
const TodoController = require('../controllers/todo.controller');


router.post("/create", async (req, res) => {
    try {
        const task = await TodoController.createTask(req.body);
        res.status(200).json({ message: 'Task added', task });
    } catch (err) {
        console.log({ message: err });
    }
});

router.get("/task", async (req, res) => {
    try {
        const task = await TodoController.getTaskbyUser(req.query.id);
        res.status(200).json({ message: 'List of user tasks', task });
    } catch (err) {
        console.log({ message: err });
    }
});

router.get("/tasks", async (req, res) => {
    try {
        const tasks = await TodoController.getAllTasks();
        res.status(200).json({ message: 'All tasks', tasks });
    } catch (err) {
        console.log({ message: err });
    }
});

router.patch("/update", async (req, res) => {
    try {
        const user = await TodoController.updateTaskByUser(req.query.id, req.body.content);
        res.status(200).json({ message: "User updated!", user });

    } catch (err) {
        console.log({ message: err });
    }
})

router.delete("/delete", async (req, res) => {
    try {
        const user = await TodoController.deleteTaskByUser(req.query.id);
        res.status(200).json({ message: "User deleted!", user });

    } catch (err) {
        console.log({ message: err });
    }
})

module.exports = router;