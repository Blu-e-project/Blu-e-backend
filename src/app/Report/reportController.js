const jwtMiddleware = require("../../../config/jwtMiddleware");
const reportProvider = require("../../app/Report/reportProvider");
const reportService = require("../../app/Report/reportService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : report 생성 API
 * [POST] /service/reports/:userId/writing
 */
exports.postreport = async function (req, res) {

    /**
     * Path Variable: userId
     * Body: targetId, title, contents
     */
    const userId = req.params.userId;
    const {targetId, title, contents} = req.body;

    if (!targetId)
        return res.send(response(baseResponse.REPORT_TARGETNICKNAME_EMPTY));

    if (!title > 20) 
        return res.send(response(baseResponse.REPORT_TITLE_LENGTH));

    if (!contents > 500)
        return res.send(response(baseResponse.REPORT_CONTENTS_EMPTY));


    const createReportResponse = await reportService.createReport(
        userId,
        targetId,
        title,
        contents,
    );

    return res.send(createReportResponse);
};