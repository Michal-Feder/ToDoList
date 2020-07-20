const taskLogic = require("../business-logic/task-logic");
import express = require('express');
const router = express.Router();
import Task from '../models/task'


router.post('/', async (req, res) => {
    try {
        const task = new Task(undefined, req.body.data.username, req.body.data.phone, req.body.data.email, req.body.data.taskCreatedDate, req.body.data.taskTitle, req.body.data.taskDescription);
        console.log("post!!");
        const addedTask = await taskLogic.addTask(task);
        res.status(201).send(addedTask);
    }
    catch (err) {
        console.log(err.message)
        res.status(500).send(err.message);
    }

});

router.put('/', async function (req, res) {
    const x = new Task(1, "mi", "m", "m", "2000-20-20", "m", "m");
    console.log("xxx ", x);
    try {
        console.log("hello put", req.body.data.task_id)
        const task = new Task(req.body.data.task_id, req.body.data.username, req.body.data.phone, req.body.data.email, req.body.data.taskCreatedDate, req.body.data.taskTitle, req.body.data.taskDescription);
        console.log("put task node", task);
        const errors = task.validatePut();
        if (errors) {
            res.status(400).send(errors);
            return;
        }
        const taskToUpdate = await taskLogic.updateTask(task);
        res.json(taskToUpdate);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await taskLogic.getAllTask();
        res.json(tasks);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        const task = new Task(id, undefined, undefined, undefined, undefined, undefined, undefined);
        const errors = task.validateRouteId();
        if (errors) {
            res.status(400).send(errors);
            return;
        }
        const foundtask = await taskLogic.getTaskById(id);
        if (!foundtask) {
            res.sendStatus(404);
            return;
        }
        res.json(foundtask);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = +req.params.id;
        const info = await taskLogic.deleteTask(id);
        res.json(info);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
});
module.exports = router;