const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const reportProvider = require("./reportProvider");
const reportDao = require("./reportDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const jwtMiddleware = require("../../../config/jwtMiddleware");
//const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");

exports.createReport = async function (userId, targetId, title, contents, image) {
    try {
        const insertReportInfoParams = [userId, targetId, title, contents, image];
        console.log(insertReportInfoParams);

        const connection = await pool.getConnection(async (conn) => conn);

        const ReportResult = await reportDao.insertReportInfo(connection, insertReportInfoParams);
        const UpdateWarning = await reportDao.updateWarningInfo(connection, targetId);
        
        console.log(`추가된 Report : ${ReportResult[0].insertId}`);
        
        const UpdateStatus = await reportDao.updateStatusInfo(connection, targetId);
        // // 신고 누적이 3회가 되면, status를 0으로 바꿈
        // const warningRows = await reportProvider.warningCheck(targetId); // Read인 Provider 통해서 확인
        // if (warningRows.length > 0)
        //     const UpdateStatus = await reportDao.updateSatusInfo(connection, targetId)

        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createReport Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};