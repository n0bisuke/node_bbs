'use strict'

const mysql      = require('mysql');
const connection = mysql.createConnection();
connection.connect(require('../db_config'));

module.exports = (sql, cb) => {
    connection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        cb(rows,err);
    });
}

// connection.end();