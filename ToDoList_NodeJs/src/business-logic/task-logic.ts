const dal = require("../data-access-layer/dal")
import Task from '../models/task'

async function getAllTask() {
    const sql = "SELECT * FROM TASKS";
    const tasks = await dal.executeAsync(sql);
    return tasks;
}

async function getTaskById(id) {
    const sql = "SELECT * FROM TASKS WHERE task_id= ?";
    const task = await dal.executeAsync(sql, [id]);
    return task[0];
}

async function addTask(task: Task) {
    console.log(task);
    const sql = "INSERT INTO TASKS(username,phone,email,taskCreatedDate,taskTitle,taskDescription) VALUES (?,?,?,?,?,?)"
    const info = await dal.executeAsync(sql, [task.username, task.phone, task.email, task.taskCreatedDate ? task.taskCreatedDate.toString().slice(0, 19).replace('T', ' ') : '0000-00-00', task.taskTitle, task.taskDescription]);
    console.log(info)
    return task;
}

async function updateTask(task) {
    let sql = "UPDATE tasks SET ";
    const values = []
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
    const taskToUpdate = await dal.executeAsync(sql, values);
    return taskToUpdate;
}

async function deleteTask(id) {
    const sql = `DELETE FROM tasks WHERE task_id = ${id}`;
    const info = await dal.executeAsync(sql);
    console.log(info);
}

module.exports = {
    getAllTask,
    getTaskById,
    addTask,
    updateTask,
    deleteTask
}