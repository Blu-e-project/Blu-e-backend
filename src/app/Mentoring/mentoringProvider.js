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

exports.retrievePickMenteeList = async function (problemId) {
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

exports.retrievePickMenteeMainList = async function (problemId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const pickMenteeListMainResult = await mentoringDao.selectPickMenteeMain(connection);

  connection.release();

  return pickMenteeListMainResult;
};

