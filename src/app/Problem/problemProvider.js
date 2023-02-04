const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const problemDao = require("./problemDao");

// Provider: Read 비즈니스 로직 처리

// 궁금한 문제 목록
exports.retrieveProblemList = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const problemListResult = await problemDao.selectProblem(connection);
    connection.release();

    return problemListResult;
};

// 특정 궁금한 문제
exports.retrieveProblem = async function (problemId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const problemResult = await problemDao.selectProblemId(connection, problemId);

  connection.release();

  return problemResult[0];
};

// 내가 궁금한 문제
exports.retrieveMyProblemList = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const problemListResult = await problemDao.selectProblemByUserId(connection, userId);

  connection.release();

  return problemListResult;
};

// 답변 목록
exports.retrieveSolutionList = async function (problemId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const solutionListResult = await problemDao.selectSolution(connection, problemId);
  connection.release();

  return solutionListResult;
};

// 내가 쓴 답변 목록
exports.retrieveSolutionListByMe = async function (userId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const solutionListResult = await problemDao.selectSolutionByUserId(connection, userId);
  connection.release();

  return solutionListResult;
};