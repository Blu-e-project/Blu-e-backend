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

exports.retrieveMyPickMenteeList = async function (userId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const myPickMenteeListResult = await myPageDao.selectMyPickMentee(connection, userId);
    connection.release();
    
    return myPickMenteeListResult;
};

exports.retrieveMyComPickMentorList = async function (userId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const myComPickMentorListResult = await myPageDao.selectMyComPickMentor(connection, userId);
    connection.release();
    
    return myComPickMentorListResult;
};

exports.retrieveMyComPickMenteeList = async function (userId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const myComPickMenteeListResult = await myPageDao.selectMyComPickMentee(connection, userId);
    connection.release();
    
    return myComPickMenteeListResult;
};

exports.mentoringList = async function(userId){
    const connection = await pool.getConnection(async (conn) => conn);
    const mentoringListResult = await mentoringDao.mentoringList(connection, userId);
    connection.release();
  
    return mentoringListResult;
  }