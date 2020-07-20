const Joi = require("Joi");
class Task {
    constructor(task_id, username, phone, email, taskCreatedDate, taskTitle, taskDescription) {
        this.task_id = task_id;
        this.username = username;
        this.phone = phone;
        this.email = email;
        this.taskCreatedDate = taskCreatedDate;
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
    }
    validatePost() {
        const result = Joi.validade(this, postValidationSchema, { abortEarly: false });
        return result.error.details ? result.error.details.map(err => err.message) : null;
    }
    validatePut() {
        const result = Joi.valid(this, putValidationSchema, { abortEarly: false });
        return result.error.details ? result.error.details.map(err => err.message) : null;
    }
    validateRouteId() {
        const result = Joi.validade(this, roteIdValidationSchema, { abortEarly: false });
        return result.error.details ? result.error.details.map(err => err.message) : null;
    }
}
const postValidationSchema = {
    task_id: Joi.number(),
    username: Joi.string().required().min(3),
    phone: Joi.string().required().min(10),
    email: Joi.string().required(),
    taskCreatedDate: Joi.date().required(),
    taskTitle: Joi.string().required(),
    taskDescription: Joi.string().required()
};
const putValidationSchema = {
    task_id: Joi.number().required().min(0),
    username: Joi.string().min(1),
    phone: Joi.string().min(7),
    email: Joi.string(),
    taskCreatedDate: Joi.date(),
    taskTitle: Joi.string(),
    taskDescription: Joi.string()
};
const roteIdValidationSchema = {
    task_id: Joi.number().required().min(0),
    username: Joi.string().optional(),
    phone: Joi.string().optional(),
    email: Joi.string().optional(),
    taskCreatedDate: Joi.date().optional(),
    taskTitle: Joi.string().optional(),
    taskDescription: Joi.string().optional()
};
module.exports = Task;
//# sourceMappingURL=task.js.map