const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const {response, errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const editingDao = require("./editingDao");

exports.nicknameCheck = async function(nickname) {
  const connection = await pool.getConnection(async (conn) => conn);
  const nicknameCheckResult = await editingDao.selectUserNickname(connection, nickname);
  connection.release();

  return nicknameCheckResult;
}