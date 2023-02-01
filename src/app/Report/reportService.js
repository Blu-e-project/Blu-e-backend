const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const reportProvider = require("./reportProvider");
const reportDao = require("./reportDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const jwtMiddleware = require("../../../config/jwtMiddleware");
//const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");

exports.createReport = async function (userId, targetId, title, contents) {
    try {
        const insertReportInfoParams = [userId, targetId, title, contents];
        console.log(insertReportInfoParams);

        const connection = await pool.getConnection(async (conn) => conn);

        const ReportResult = await reportDao.insertReportInfo(connection, insertReportInfoParams);
        
        console.log(`추가된 Report : ${ReportResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createReport Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};