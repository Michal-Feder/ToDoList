const mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'Task'
});
connection.connect(err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("connect to task database on mtsql");
});
function executeAsync(sql, values) {
    return new Promise((resolve, rejects) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                rejects(err);
                return;
            }
            resolve(result);
        });
    });
}
module.exports = {
    executeAsync
};
//# sourceMappingURL=dal.js.map