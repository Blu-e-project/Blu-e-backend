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

// 내가 궁금한 문제 목록
exports.retrieveMyProblemList = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const problemListResult = await problemDao.selectProblemByUserId(connection, userId);

  connection.release();

  return problemListResult;
};

// 특정 문제 답변 목록
exports.retrieveSolutionList = async function (problemId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const solutionListResult = await problemDao.selectSolution(connection, problemId);
  connection.release();

  return solutionListResult;
};

// 내가 답변한 질문글 목록
exports.retrieveProblemSolByMeList = async function (userId) {

  const connection = await pool.getConnection(async (conn) => conn);
  const problemListResult = await problemDao.selectProblemSolByMe(connection, userId);
  connection.release();

  return problemListResult;
};

// 문제 부분 조회(최신 5개)
exports.retrieveProblemMainList = async function () {

  const connection = await pool.getConnection(async (conn) => conn);
  const problemListMainResult = await problemDao.selectProblemMain(connection);
  connection.release();

  return problemListMainResult;
};