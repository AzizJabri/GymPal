const mysql = require('mysql2');

const { DB } = require('../configs');

const pool = mysql.createPool({
    host: DB.DB_HOST,
    port: DB.DB_PORT,
    user: DB.DB_USER,
    password: DB.DB_PASSWORD,
    database: DB.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();