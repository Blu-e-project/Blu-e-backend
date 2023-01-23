const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리
exports.idCheck = async function(id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const idCheckResult = await userDao.selectUserId(connection, id);
  connection.release();

  return idCheckResult;
}

exports.passwordCheck = async function(selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(connection, selectUserPasswordParams);
  connection.release();

  return passwordCheckResult;
}

exports.accountCheck = async function(id){
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, id);
  connection.release();

  return userAccountResult;
}

exports.retrieveQuestion = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const questionListResult = await userDao.selectQuestion(connection, userId);
  
    connection.release();
  
    return questionListResult;
  };