const mysql = require("mysql");

// 创建连接
const createConnection = () => mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "qwer1234",
    database: "myBlog"
});

const sendConnect = (Sql, params, success) => {
    let connection = createConnection();

    connection.connect();

    connection.query(Sql, params, function (error, result) {
        error === null ? success && success(result) : console.log(error);
    });

    connection.end();
};

module.exports = sendConnect;
