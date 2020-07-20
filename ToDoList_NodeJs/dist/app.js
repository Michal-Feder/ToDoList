"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const port = 3000;
// const express = require('express');
const express = require("express");
const app = express();
var controllers = require('./controllers/controller');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var router = express.Router();
//options for cors midddleware
const options = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false
};
//use cors middleware
//router.use(cors(options));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //  res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
//router.options("*", cors(options));
app.use("/api/tasks", controllers);
app.get("*", (req, res) => {
    res.status(404).send("Route Not Found");
});
app.listen(port, () => console.log(`App listening on port ${port}!`));
//# sourceMappingURL=app.js.map