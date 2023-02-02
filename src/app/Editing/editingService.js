const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const editingProvider = require("./editingProvider");
const editingDao = require("./editingDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const jwtMiddleware = require("../../../config/jwtMiddleware");
//const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");

exports.editUser = async function (name, nickname, birth, education, address, introduce, userId) {
    try {
        const updateUserInfoParams = [name, nickname, birth, education, address, introduce, userId];
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await editingDao.updateUserInfo(connection, updateUserInfoParams);

        console.log(`${userId}의 정보 수정 완료`);
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}