const jwtMiddleware = require("../../../config/jwtMiddleware");
const myPageProvider = require("../../app/MyPage/myPageProvider");
const myPageService = require("../../app/MyPage/myPageService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");


/**
 * API No. 1
 * API Name : 내가 쓴 멘토 구인글 조회 API
 * [GET] /myPage/myMentorPick
 */

exports.getPickMentorsByMe = async function (req, res) {

    const userId = req.verifiedToken.userId;
    const myPickMentorListResult = await myPageProvider.retrieveMyPickMentorList(userId);
    return res.send(response(baseResponse.SUCCESS, myPickMentorListResult));

};

/**
 * API No. 2
 * API Name : 내가 쓴 멘티 구인글 조회 API
 * [GET] /myPage/myMenteePick
 */

exports.getPickMenteesByMe = async function (req, res) {

    const myPickMenteeListResult = await myPageProvider.retrieveMyPickMenteeList();
    return res.send(response(baseResponse.SUCCESS, myPickMenteeListResult));

};