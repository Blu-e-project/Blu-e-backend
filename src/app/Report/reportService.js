const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const reportProvider = require("./reportProvider");
const reportDao = require("./reportDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const jwtMiddleware = require("../../../config/jwtMiddleware");
//const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");

exports.createReport = async function (userId, targetnickname, title, contents, image) {
    try {
        const insertReportInfoParams = [userId, targetnickname, title, contents, image];
        console.log(insertReportInfoParams);

        const connection = await pool.getConnection(async (conn) => conn);

        // const GetTargetIdByNickname = await reportProvider.getTargetId(targetnickname);
        // console.log(GetTargetIdByNickname[0]);

        // insertReportInfoParams = [userId, GetTargetIdByNickname[0].userId, title, contents, image];
        // console.log(insertReportInfoParams);
        const ReportResult = await reportDao.insertReportInfo(connection, userId, targetnickname, title, contents, image);
        const UpdateWarning = await reportDao.updateWarningInfo(connection, targetnickname);
        
        console.log(`추가된 Report : ${ReportResult[0].insertId}`);
        
        // 신고 누적이 3회가 되면, status를 0으로 바꿈
        const UpdateStatus = await reportDao.updateStatusInfo(connection, targetnickname);

        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createReport Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};