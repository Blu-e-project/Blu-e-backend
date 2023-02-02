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

/**
 * API No. 7
 * API Name : 특정 멘토 구인글 조회
 * [GET] /mentoring/mentors/:pickId
 */
exports.getPickMentorsById = async function (req, res) {

    /**
     * Path Variable: pickId
     */
    const pickId = req.params.pickId;
    // 빈 값 체크
    if (!pickId) return res.send(errResponse(baseResponse.MENTORING_PICKID_EMPTY));

    const pickMentorsById = await mentoringProvider.retrievePickMentor(pickId);
    return res.send(response(baseResponse.SUCCESS, pickMentorsById));
};

/**
 * API No. 8
 * API Name : 특정 멘티 구인글 조회
 * [GET] /mentoring/mentees/:pickId
 */
exports.getPickMenteesById = async function (req, res) {

    /**
     * Path Variable: pickId
     */
    const pickId = req.params.pickId;
    // 빈 값 체크
    if (!pickId) return res.send(errResponse(baseResponse.MENTORING_PICKID_EMPTY));

    const pickMenteesById = await mentoringProvider.retrievePickMentee(pickId);
    return res.send(response(baseResponse.SUCCESS, pickMenteesById));
};

/**
 * API No. 9
 * API Name : 멘토 구하는 글 수정
 * [PATCH] /mentoring/mentors/:pickId
 * path variable : pickId
 */
exports.patchPickMentor = async function (req, res) {

    const pickId = req.params.pickId;
    const {title, contents, subject, area, mentoringMethod, mentorCareer, periodStart, periodEnd, wishGender} = req.body;

    

  //  if (!content) res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

    const patchPickMentorsResponse = await mentoringService.updatePickMentor(
        pickId,
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

    return res.send(patchPickMentorsResponse);
    
};

/**
 * API No. 10
 * API Name : 멘티 구하는 글 수정
 * [PATCH] /mentoring/mentees/:pickId
 * path variable : pickId
 */


/**
 * API No. 11
 * API Name : 멘토 구하는 글 삭제
 * [DELETE] /mentoring/mentors/:pickId
 * path variable : pickId
 */
exports.deletePickMentor= async function(req, res){
    const pickId=req.params.pickId;

    if (!pickId) return res.send(errResponse(baseResponse.MENTORING_PICKID_EMPTY));

    const deletePickMentorResponse = await mentoringService.deletePickMentor(pickId);
    return res.send(deletePickMentorResponse);

}

/**
 * API No. 12
 * API Name : 멘티 구하는 글 삭제
 * [DELETE] /mentoring/mentees/:pickId
 * path variable : pickId
 */
exports.deletePickMentee= async function(req, res){
    const pickId=req.params.pickId;

    if (!pickId) return res.send(errResponse(baseResponse.MENTORING_PICKID_EMPTY));

    const deletePickMenteeResponse = await mentoringService.deletePickMentee(pickId);
    return res.send(deletePickMenteeResponse);

}


/**
 * API No. 13
 * API Name : 멘토 구하는 글에 댓글 생성
 * [POST] /mentoring/mentors/{pickId}/comments
 */
// 유효성 검사 추가하기
exports.postPickMentorsCom = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const pickId = req.params.pickId;
    const {contents} = req.body;

    // 댓글은 한 번만 쓸 수 있게 하기

    if (!pickId) return res.send(errResponse(baseResponse.PICKMENTORS_PICKID_EMPTY))
    if (!contents)
        return res.send(errResponse(baseResponse.PICKMENTORS_COMMENT_EMPTY))
    if (contents.length > 300)
        return res.send(errResponse(baseResponse.PICKMENTORS_COMMENT_LENGTH))

    // userId가 댓글 단 사람 ID, pickId가 글 번호, role이 멘토인지 멘티인지, contents는 댓글 내용
    const postPickMentorsComResponse = await mentoringService.createMentorsCom(
        userId,
        pickId,
        contents
    )
    return res.send(postPickMentorsComResponse)

}

/**
 * API No. 14
 * API Name : 멘토 구하는 글에 댓글 조회
 * [GET] /mentoring/mentors/{pickId}/comments
 */
exports.getPickMentorsCom = async function (req, res){
    const pickId = req.params.pickId;

    if (!pickId) return res.send(errResponse(baseResponse.PICKMENTORS_PICKID_EMPTY))
    const pickMentorsComListResult = await mentoringProvider.retrievePickMentorComList(pickId);
    return res.send(response(baseResponse.SUCCESS, pickMentorsComListResult))
    
}

/**
 * API No. 15
 * API Name : 멘토 구하는 글에 댓글 수정
 * [PATCH] /mentoring/mentors/{pickId}/comments/{pickCommentId}
 */
exports.patchPickMentorsCom = async function(req, res) {
    const userId = req.verifiedToken.userId;
    const {contents} = req.body;
    const pickId = req.params.pickId;
    const pickCommentId = req.params.pickCommentId;

    // 내가 작성한 댓글만 수정할 수 있도록 고칠 예정
    if (!pickId) return res.send(errResponse(baseResponse.PICKMENTORS_PICKID_EMPTY))
    if (!pickCommentId) return res.send(errResponse(baseResponse.PICKMENTORS_COMMENTID_EMPTY))
    if (!contents) return res.send(errResponse(baseResponse.PICKMENTORS_COMMENT_EMPTY))
    if (contents.length > 300) return res.send(errResponse(baseResponse.PICKMENTORS_COMMENT_LENGTH))

    const updatePickMentorsComResponse = await mentoringService.updateMentorsCom(
        contents,
        pickId,
        pickCommentId,
    );
    return res.send(updatePickMentorsComResponse);
}

/**
 * API No. 16
 * API Name : 멘토 구하는 글에 댓글 삭제
 * [PATCH] /mentoring/mentors/{pickId}/comments/{pickCommentId}
 */
exports.deletePickMentorsCom = async function(req, res){
    const pickId = req.params.pickId;
    const pickCommentId = req.params.pickCommentId;

    // 내가 작성한 댓글만 삭제할 수 있도록 고치기
    if (!pickId) return res.send(errResponse(baseResponse.PICKMENTORS_PICKID_EMPTY))
    if (!pickCommentId) return res.send(errResponse(baseResponse.PICKMENTORS_COMMENTID_EMPTY))

    const deletePickMentorsComResponse = await mentoringService.deleteMentorsCom(
        pickId,
        pickCommentId
    )
    return res.send(deletePickMentorsComResponse);
}