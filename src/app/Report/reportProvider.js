const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const {response, errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const reportDao = require("./reportDao");

// Provider: Read 비즈니스 로직 처리
exports.matchingCheckInfo = async function(userId, targetnickname) {
  const connection = await pool.getConnection(async (conn) => conn);
  const matchingCheckResult = await reportDao.matchingCheck(connection, userId, targetnickname);
  connection.release();

  return matchingCheckResult;
}