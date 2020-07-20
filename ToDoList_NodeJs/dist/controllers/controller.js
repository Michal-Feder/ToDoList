"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskLogic = require("../business-logic/task-logic");
const express = require("express");
const router = express.Router();
const task_1 = __importDefault(require("../models/task"));
router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const task = new task_1.default(undefined, req.body.data.username, req.body.data.phone, req.body.data.email, req.body.data.taskCreatedDate, req.body.data.taskTitle, req.body.data.taskDescription);
        console.log("post!!");
        const addedTask = yield taskLogic.addTask(task);
        res.status(201).send(addedTask);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}));
router.put('/', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const x = new task_1.default(1, "mi", "m", "m", "2000-20-20", "m", "m");
        console.log("xxx ", x);
        try {
            console.log("hello put", req.body.data.task_id);
            const task = new task_1.default(req.body.data.task_id, req.body.data.username, req.body.data.phone, req.body.data.email, req.body.data.taskCreatedDate, req.body.data.taskTitle, req.body.data.taskDescription);
            console.log("put task node", task);
            const errors = task.validatePut();
            if (errors) {
                res.status(400).send(errors);
                return;
            }
            const taskToUpdate = yield taskLogic.updateTask(task);
            res.json(taskToUpdate);
        }
        catch (err) {
            res.status(500).send(err.message);
        }
    });
});
router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const tasks = yield taskLogic.getAllTask();
        res.json(tasks);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
router.get('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const task = new task_1.default(id, undefined, undefined, undefined, undefined, undefined, undefined);
        const errors = task.validateRouteId();
        if (errors) {
            res.status(400).send(errors);
            return;
        }
        const foundtask = yield taskLogic.getTaskById(id);
        if (!foundtask) {
            res.sendStatus(404);
            return;
        }
        res.json(foundtask);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
router.delete('/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        const info = yield taskLogic.deleteTask(id);
        res.json(info);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
module.exports = router;
//# sourceMappingURL=controller.js.map