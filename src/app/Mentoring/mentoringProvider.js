const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const mentoringDao = require("./mentoringDao");

// Provider: Read 비즈니스 로직 처리

exports.retrievePickMentorList = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const pickMentorListResult = await mentoringDao.selectPickMentor(connection);
    connection.release();

    return pickMentorListResult;
};

exports.retrievePickMenteeList = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const pickMenteeListResult = await mentoringDao.selectPickMentee(connection);

  connection.release();

  return pickMenteeListResult;
};

exports.retrievePickMentorMainList = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const pickMentorListMainResult = await mentoringDao.selectPickMentorMain(connection);
    connection.release();

    return pickMentorListMainResult;
};

exports.retrievePickMenteeMainList = async function () {
  const connection = await pool.getConnection(async (conn) => conn);
  const pickMenteeListMainResult = await mentoringDao.selectPickMenteeMain(connection);

  connection.release();

  return pickMenteeListMainResult;
};

exports.retrievePickMentor = async function (pickId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const pickMentorByIdResult = await mentoringDao.selectPickMentorById(connection, pickId);
  await mentoringDao.updateViewCount2(connection, pickId);
  connection.release();

  return pickMentorByIdResult;
};

exports.retrievePickMentee = async function (pickId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const pickMenteeByIdResult = await mentoringDao.selectPickMenteeById(connection, pickId);
  await mentoringDao.updateViewCount1(connection, pickId);
  connection.release();

  return pickMenteeByIdResult;
};

exports.roleCheck = async function(userId){
  const connection = await pool.getConnection(async (conn) => conn);
  const roleCheckResult = await mentoringDao.selectUserRole(connection, userId);
  connection.release();

  return roleCheckResult;
}

exports.pickUserCheck = async function(pickId, userId){
  const connection = await pool.getConnection(async (conn) => conn);
  const pickUserCheckResult = await mentoringDao.selectPickUser(connection, pickId, userId);
  connection.release();

  return pickUserCheckResult;
}

exports.retrievePickMentorComList = async function(pickId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const pickMentorComListResult = await mentoringDao.selectMentorCom(connection, pickId);
  connection.release();

  return pickMentorComListResult
}

exports.retrievePickMenteeComList = async function(pickId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const pickMenteeComListResult = await mentoringDao.selectMenteeCom(connection, pickId);
  connection.release();

  return pickMenteeComListResult
}

exports.retrievePickMenteeCom = async function(userId, pickId){
  const connection = await pool.getConnection(async (conn) => conn);
  const pickMenteeComListResult = await mentoringDao.selectMatchingCom(connection, userId, pickId);
  connection.release();

  return pickMenteeComListResult
}

exports.pickComCheckByUserId = async function(pickComCheckParams){
  const connection = await pool.getConnection(async (conn) => conn);
  const comCheckResult = await mentoringDao.selectPickComByUserId(connection, pickComCheckParams);
  connection.release();

  return comCheckResult;
}

exports.selectPickComUser = async function(pickCommentId){
  const connection = await pool.getConnection(async (conn) => conn);
  const comCheckResult = await mentoringDao.selectPickComUser(connection, pickCommentId);
  connection.release();

  return comCheckResult;
}

exports.pickStatusCheck = async function(pickId){
  const connection = await pool.getConnection(async (conn) => conn);
  const pickStatusResult = await mentoringDao.pickStatusCheck(connection, pickId);
  connection.release();

  return pickStatusResult;
}

exports.userIdCheck = async function(pickId){
  const connection = await pool.getConnection(async (conn) => conn);
  const userIdCheckResult = await mentoringDao.userIdCheck(connection, pickId);
  connection.release();

  return userIdCheckResult;
}

exports.mentoringList = async function(userId){
  const connection = await pool.getConnection(async (conn) => conn);
  const mentoringListResult = await mentoringDao.mentoringList(connection, userId);
  connection.release();

  return mentoringListResult;
}