const jwtMiddleware = require("../../../config/jwtMiddleware");
const mentoringProvider = require("../../app/Mentoring/mentoringProvider");
const mentoringService = require("../../app/Mentoring/mentoringService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");


/**
 * API No. 1
 * API Name : 멘토 구인글 전체 조회
 * [GET] /mentoring/find-mentors
 */
exports.getPickMentors = async function (req, res) {

        // 멘토 구인글 전체 조회
        const pickMentorListResult = await mentoringProvider.retrievePickMentorList();
        return res.send(response(baseResponse.SUCCESS, pickMentorListResult));
    
};


/**
 * API No. 2
 * API Name : 멘티 구인글 조회
 * [GET] //menthoring/find-mentees
 */
exports.getPickMentees = async function (req, res) {

        // 멘티 구인글 전체 조회
        const pickMenteeListResult = await mentoringProvider.retrievePickMenteeList();
        return res.send(response(baseResponse.SUCCESS, pickMenteeListResult));

};


/**
 * API No. 3
 * API Name : 멘토 구인글 부분 조회 (조회수 많은 순 5개)
 * [GET] /main/hot-mentors
 */
exports.getPickMentorsMain = async function (req, res) {

    // 멘토 구인글 부분 조회 (조회수 많은 순 5개)
    const pickMentorMainListResult = await mentoringProvider.retrievePickMentorMainList();
    return res.send(response(baseResponse.SUCCESS, pickMentorMainListResult));

};


/**
* API No. 4
 * API Name : 멘티 구인글 부분 조회 (조회수 많은 순 5개)
 * [GET] /main/hot-mentees
*/
exports.getPickMenteesMain = async function (req, res) {

    // 멘티 구인글 부분 조회 (조회수 많은 순 5개)
    const pickMenteeListResult = await mentoringProvider.retrievePickMenteeMainList();
    return res.send(response(baseResponse.SUCCESS, pickMenteeListResult));

};
