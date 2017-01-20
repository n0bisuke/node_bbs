'use strict'

const mysql      = require('mysql');
const connection = mysql.createConnection(require('../db_config'));
connection.connect();
// connection.end();

module.exports = (sql, cb) => {
    connection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        cb(rows,err);
    });
}

// connection.end();