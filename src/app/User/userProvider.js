const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const {response, errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
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

exports.retrieveMentorList = async function () {

  const connection = await pool.getConnection(async (conn) => conn);
  const mentorListResult = await userDao.selectMentor(connection);
  connection.release();

  return mentorListResult;
};

exports.retrieveMenteeList = async function () {

  const connection = await pool.getConnection(async (conn) => conn);
  const menteeListResult = await userDao.selectMentee(connection);
  connection.release();

  return menteeListResult;
};

exports.retrieveNewMentorList = async function () {

  const connection = await pool.getConnection(async (conn) => conn);
  const newMentorListResult = await userDao.selectNewMentor(connection);
  connection.release();

  return newMentorListResult;
};

exports.retrieveNewMenteeList = async function () {

  const connection = await pool.getConnection(async (conn) => conn);
  const newMenteeListResult = await userDao.selectNewMentee(connection);
  connection.release();

  return newMenteeListResult;
};






exports.retrieveMentor = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const mentorResult = await userDao.selectMentorById(connection, userId);
  connection.release();

  return mentorResult[0];
}

exports.retrieveMentee = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const menteeResult = await userDao.selectMenteeById(connection, userId);
  connection.release();
  console.log(menteeResult[0]);
  if(typeof menteeResult[0] == "undefined"){
    return errResponse(baseResponse.USER_USERID_EMPTY);
  }
  return menteeResult[0];
}
