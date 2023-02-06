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
 * [POST] /service/reports/writing
 */
exports.postreport = async function (req, res) {

    /**
     * Body: targetId, title, contents
     */
    const userId = req.verifiedToken.userId;
    const {targetnickname, title, contents, image} = req.body;

    if (!targetnickname)
        return res.send(response(baseResponse.REPORT_TARGETNICKNAME_EMPTY));

    if (!title)
        return res.send(response(baseResponse.REPORT_TITLE_EMPTY));

    if (!contents)
        return res.send(response(baseResponse.REPORT_CONTENTS_EMPTY));


    if (!title.length > 20) 
        return res.send(response(baseResponse.REPORT_TITLE_LENGTH));

    if (!contents.length > 500)
        return res.send(response(baseResponse.REPORT_CONTENTS_LENGTH));


    const createReportResponse = await reportService.createReport(
        userId,
        targetnickname,
        title,
        contents,
        image,
    );

    return res.send(createReportResponse);
};