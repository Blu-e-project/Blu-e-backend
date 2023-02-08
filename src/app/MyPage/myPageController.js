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

    const userId = req.verifiedToken.userId;
    const myPickMenteeListResult = await myPageProvider.retrieveMyPickMenteeList(userId);
    return res.send(response(baseResponse.SUCCESS, myPickMenteeListResult));

};

/**
 * API No. 3
 * API Name : 내가 댓글 쓴 멘토 구인글 조회 API
 * [GET] /myPage/myMentorComPick
 */

exports.getPickMentorsByMyCom = async function (req, res) {

    const userId = req.verifiedToken.userId;
    const myComPickMentorListResult = await myPageProvider.retrieveMyComPickMentorList(userId);
    return res.send(response(baseResponse.SUCCESS, myComPickMentorListResult));

};

/**
 * API No. 4
 * API Name : 내가 댓글 쓴 멘티 구인글 조회 API
 * [GET] /myPage/myMenteeComPick
 */

exports.getPickMenteesByMyCom = async function (req, res) {

    const userId = req.verifiedToken.userId;
    const myComPickMenteeListResult = await myPageProvider.retrieveMyComPickMenteeList(userId);
    return res.send(response(baseResponse.SUCCESS, myComPickMenteeListResult));

};

/**
 * API No. 5
 * API Name : 멘토링 내역 조회 API
 * [GET] /myPage/myMentoring
 */
exports.getMyMentoring = async function(req, res) {
    //const userId = req.verifiedToken.userId;
    const userId= 2;
    const mentoringListResponse = await myPageProvider.mentoringList(userId);
    console.log(mentoringListResponse[0].state)
    
    // state가 양수면 활동 진행 중, 음수면 활동 종료
    return res.send(response(baseResponse.SUCCESS, mentoringListResponse))
}