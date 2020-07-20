"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dal = require("../data-access-layer/dal");
function getAllTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT * FROM TASKS";
        const tasks = yield dal.executeAsync(sql);
        return tasks;
    });
}
function getTaskById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = "SELECT * FROM TASKS WHERE task_id= ?";
        const task = yield dal.executeAsync(sql, [id]);
        return task[0];
    });
}
function addTask(task) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(task);
        const sql = "INSERT INTO TASKS(username,phone,email,taskCreatedDate,taskTitle,taskDescription) VALUES (?,?,?,?,?,?)";
        const info = yield dal.executeAsync(sql, [task.username, task.phone, task.email, task.taskCreatedDate ? task.taskCreatedDate.toString().slice(0, 19).replace('T', ' ') : '0000-00-00', task.taskTitle, task.taskDescription]);
        console.log(info);
        return task;
    });
}
function updateTask(task) {
    return __awaiter(this, void 0, void 0, function* () {
        let sql = "UPDATE tasks SET ";
        const values = [];
        if (task.username !== undefined) {
            sql += "username = ?,";
            values.push(task.username);
        }
        if (task.phone !== undefined) {
            sql += "phone = ?,";
            values.push(task.phone);
        }
        if (task.email !== undefined) {
            sql += "email = ?,";
            values.push(task.email);
        }
        if (task.taskCreatedDate !== undefined) {
            sql += "taskCreatedDate = ?,";
            values.push(task.taskCreatedDate.toString().slice(0, 19).replace('T', ' '));
        }
        if (task.taskTitle !== undefined) {
            sql += "taskTitle = ?,";
            values.push(task.taskTitle);
        }
        if (task.taskDescription !== undefined) {
            sql += "taskDescription = ?,";
            values.push(task.taskDescription);
        }
        sql = sql.substr(0, sql.length - 1);
        sql += " WHERE task_id= ?";
        values.push(task.task_id);
        const taskToUpdate = yield dal.executeAsync(sql, values);
        return taskToUpdate;
    });
}
function deleteTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const sql = `DELETE FROM tasks WHERE task_id = ${id}`;
        const info = yield dal.executeAsync(sql);
        console.log(info);
    });
}
module.exports = {
    getAllTask,
    getTaskById,
    addTask,
    updateTask,
    deleteTask
};
//# sourceMappingURL=task-logic.js.map