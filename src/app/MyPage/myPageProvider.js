const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const myPageDao = require("./myPageDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveMyPickMentorList = async function (userId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const myPickMentorListResult = await myPageDao.selectMyPickMentor(connection, userId);
    connection.release();

    return myPickMentorListResult;
};

exports.retrieveMyPickMenteeList = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const myPickMenteeListResult = await myPageDao.selectMyPickMentee(connection);
    connection.release();
    
    return myPickMenteeListResult;
};

exports.retrieveMyComPickMentorList = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const myComPickMentorListResult = await myPageDao.selectMyComPickMentor(connection);
    connection.release();
    
    return myComPickMentorListResult;
};

exports.retrieveMyComPickMenteeList = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const myComPickMenteeListResult = await myPageDao.selectMyComPickMentee(connection);
    connection.release();
    
    return myComPickMenteeListResult;
};