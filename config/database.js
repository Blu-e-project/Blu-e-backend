const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3305',
    password: 'root',
    database: 'blu_e_db'
});

module.exports = {
    pool: pool
};