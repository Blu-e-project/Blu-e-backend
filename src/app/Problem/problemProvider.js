const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const problemDao = require("./problemDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveProblemList = async function () {

    const connection = await pool.getConnection(async (conn) => conn);
    const problemListResult = await problemDao.selectProblem(connection);
    connection.release();

    return problemListResult;
};

exports.retrieveProblem = async function (problemId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const problemResult = await problemDao.selectProblemId(connection, problemId);

  connection.release();

  return problemResult[0];
};
