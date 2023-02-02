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


/**
 * API No. 5
 * API Name : 멘토 구인글 작성
 * [POST] /mentoring/mentors
 */
exports.postPickMentors = async function (req, res) {

    /**
     * Body: title, contents, subject, area, mentoringMethod, mentorCareer, periodStart, periodEnd, wishGender
     */

    const userId = req.verifiedToken.userId;
    const {title, contents, subject, area, mentoringMethod, mentorCareer, periodStart, periodEnd, wishGender} = req.body;

    // 빈 값 체크
    if (!title){
        return res.send(errResponse(baseResponse.POSTPICK_TITLE_EMPTY));
    } else if (!contents) {
        return res.send(errResponse(baseResponse.POSTPICK_CONTENTS_EMPTY));
    } else if (!subject) {
        return res.send(errResponse(baseResponse.POSTPICK_SUBJECT_EMPTY));
    } else if (!area) {
        return res.send(errResponse(baseResponse.POSTPICK_AREA_EMPTY));
    } else if (!mentoringMethod) {
        return res.send(errResponse(baseResponse.POSTPICK_MENTORINGMETHOD_EMPTY));
    } else if (!mentorCareer) {
        return res.send(errResponse(baseResponse.POSTPICK_MENTORCAREER_EMPTY));
    } else if (!periodStart) {
        return res.send(errResponse(baseResponse.POSTPICK_PERIODSTART_EMPTY));
    } else if (!periodEnd) {
        return res.send(errResponse(baseResponse.POSTPICK_PERIODEND_EMPTY));
    } else if (!wishGender) {
        return res.send(errResponse(baseResponse.POSTPICK_WISHGENDER_EMPTY));
    }
    
    
    
    // 길이 체크
    if (title.length > 30){
        return res.send(errResponse(baseResponse.POSTPICK_TITLE_LENGTH));
    } else if (contents.length > 300){
        return res.send(errResponse(baseResponse.POSTPICK_CONTENTS_LENGTH));
    } else if (subject.length > 15){
        return res.send(errResponse(baseResponse.POSTPICK_SUBJECT_LENGTH));
    } else if (area.length > 50) {
        return res.send(errResponse(baseResponse.POSTPICKM_AREA_LENGTH)); 
    } else if (mentoringMethod.length > 10) {
        return res.send(errResponse(baseResponse.POSTPICK_MENTORINGMETHOD_LENGTH)); 
    } else if (mentorCareer.length > 10) {
        return res.send(errResponse(baseResponse.POSTPICK_MENTORCAREER_LENGTH)); 
    } else if (wishGender.length > 10) {
        return res.send(errResponse(baseResponse.POSTPICK_WISHGENDER_LENGTH)); 
    }

    const postPickMentorsResponse = await mentoringService.createPickMentors(
        userId,
        title, 
        contents, 
        area, 
        mentoringMethod, 
        mentorCareer,
        subject,  
        periodStart, 
        periodEnd, 
        wishGender
    );

    return res.send(postPickMentorsResponse);
};


/**
 * API No. 6
 * API Name : 멘티 구인글 작성
 * [POST] /mentoring/mentees
 */
exports.postPickMentees = async function (req, res) {

    /**
     * Body: title, contents, subject, area, mentoringMethod, menteeLevel, periodStart, periodEnd, wishGender
     */

    const userId = req.verifiedToken.userId;
    const {title, contents, subject, area, mentoringMethod, menteeLevel, periodStart, periodEnd, wishGender} = req.body;

    // 빈 값 체크
    if (!title){
        return res.send(errResponse(baseResponse.POSTPICK_TITLE_EMPTY));
    } else if (!contents) {
        return res.send(errResponse(baseResponse.POSTPICK_CONTENTS_EMPTY));
    } else if (!subject) {
        return res.send(errResponse(baseResponse.POSTPICK_SUBJECT_EMPTY));
    } else if (!area) {
        return res.send(errResponse(baseResponse.POSTPICK_AREA_EMPTY));
    } else if (!mentoringMethod) {
        return res.send(errResponse(baseResponse.POSTPICK_MENTORINGMETHOD_EMPTY));
    } else if (!menteeLevel) {
        return res.send(errResponse(baseResponse.POSTPICK_MENTEELEVEL_EMPTY));
    } else if (!periodStart) {
        return res.send(errResponse(baseResponse.POSTPICK_PERIODSTART_EMPTY));
    } else if (!periodEnd) {
        return res.send(errResponse(baseResponse.POSTPICK_PERIODEND_EMPTY));
    } else if (!wishGender) {
        return res.send(errResponse(baseResponse.POSTPICK_WISHGENDER_EMPTY));
    }
    
    
    
    // 길이 체크
    if (title.length > 30){
        return res.send(errResponse(baseResponse.POSTPICK_TITLE_LENGTH));
    } else if (contents.length > 300){
        return res.send(errResponse(baseResponse.POSTPICK_CONTENTS_LENGTH));
    } else if (subject.length > 15){
        return res.send(errResponse(baseResponse.POSTPICK_SUBJECT_LENGTH));
    } else if (area.length > 50) {
        return res.send(errResponse(baseResponse.POSTPICKM_AREA_LENGTH)); 
    } else if (mentoringMethod.length > 10) {
        return res.send(errResponse(baseResponse.POSTPICK_MENTORINGMETHOD_LENGTH)); 
    } else if (menteeLevel.length > 10) {
        return res.send(errResponse(baseResponse.POSTPICK_MENTEELEVEL_LENGTH)); 
    } else if (wishGender.length > 10) {
        return res.send(errResponse(baseResponse.POSTPICK_WISHGENDER_LENGTH)); 
    }

    const postPickMenteesResponse = await mentoringService.createPickMentees(
        userId,
        title, 
        contents, 
        area, 
        mentoringMethod, 
        menteeLevel,
        subject,  
        periodStart, 
        periodEnd, 
        wishGender
    );

    return res.send(postPickMenteesResponse);
};