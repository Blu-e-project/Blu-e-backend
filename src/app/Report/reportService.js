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

        // 신고하려는 유저와 매칭이 되어 있는 지 확인
        const matchingCheck = await reportProvider.matchingCheckInfo(userId, targetnickname);
        if(!matchingCheck[0].length > 0)
            return errResponse(baseResponse.REPORT_MATCHING_EMPTH);

        const connection = await pool.getConnection(async (conn) => conn);     
        const ReportResult = await reportDao.insertReportInfo(connection, insertReportInfoParams);
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