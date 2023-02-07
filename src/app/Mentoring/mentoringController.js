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

     /**
     * Body: title, contents, subject, area, mentoringMethod, mentorCareer, periodStart, periodEnd, wishGender
     */

     /**
     * Path Variable: pickId
     */
     const pickId = req.params.pickId;
     const userId = req.verifiedToken.userId;
     console.log(userId);
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
 
     const patchPickMentorsResponse = await mentoringService.patchPickMentors(
         pickId,
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
 
     return res.send(patchPickMentorsResponse);
    
};

/**
 * API No. 10
 * API Name : 멘티 구하는 글 수정
 * [PATCH] /mentoring/mentees/:pickId
 * path variable : pickId
 */
exports.patchPickMentee = async function (req, res) {

    /**
    * Body: title, contents, subject, area, mentoringMethod, mentorCareer, periodStart, periodEnd, wishGender
    */

    /**
    * Path Variable: pickId
    */
    const pickId = req.params.pickId;
    const userId = req.verifiedToken.userId;
    console.log(userId);
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

    const patchPickMenteesResponse = await mentoringService.patchPickMentees(
        pickId,
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

    return res.send(patchPickMenteesResponse);
   
};


/**
 * API No. 11
 * API Name : 멘토 구하는 글 삭제
 * [DELETE] /mentoring/mentors/:pickId
 * path variable : pickId
 */
exports.deletePickMentor= async function(req, res){


    const userId = req.verifiedToken.userId;
    const pickId=req.params.pickId;

    if (!pickId) return res.send(errResponse(baseResponse.MENTORING_PICKID_EMPTY));

    const deletePickMentorResponse = await mentoringService.deletePickMentor(pickId, userId);
    return res.send(deletePickMentorResponse);

}

/**
 * API No. 12
 * API Name : 멘티 구하는 글 삭제
 * [DELETE] /mentoring/mentees/:pickId
 * path variable : pickId
 */
exports.deletePickMentee= async function(req, res){

    const userId = req.verifiedToken.userId;
    const pickId=req.params.pickId;

    if (!pickId) return res.send(errResponse(baseResponse.MENTORING_PICKID_EMPTY));

    const deletePickMenteeResponse = await mentoringService.deletePickMentee(pickId, userId);
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

    if (!pickId) return res.send(errResponse(baseResponse.PICKCOMMENT_PICKID_EMPTY))
    if (!contents)
        return res.send(errResponse(baseResponse.PICKCOMMENT_COMMENTID_EMPTY))
    if (contents.length > 300)
        return res.send(errResponse(baseResponse.PICKCOMMENT_COMMENT_LENGTH))

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

    if (!pickId) return res.send(errResponse(baseResponse.PICKCOMMENT_PICKID_EMPTY))
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


    if (!pickId) return res.send(errResponse(baseResponse.PICKCOMMENT_PICKID_EMPTY))
    if (!pickCommentId) return res.send(errResponse(baseResponse.PICKCOMMENT_COMMENTID_EMPTY))

    const pickComUserIdCheck = await mentoringProvider.selectPickComUser(pickCommentId);
    console.log(pickComUserIdCheck[0].userId)

    // 내가 쓴 댓글인지 확인
    if (userId !== pickComUserIdCheck[0].userId)
        return res.send(errResponse(baseResponse.PICKCOMMENT_USERID_WRONG))

    if (!contents) return res.send(errResponse(baseResponse.PICKCOMMENT_COMMENT_EMPTY))
    if (contents.length > 300) return res.send(errResponse(baseResponse.PICKCOMMENT_COMMENT_LENGTH))

    const updatePickMentorsComResponse = await mentoringService.updateMentorsCom(
        userId,
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
    const userId = req.verifiedToken.userId;
    const pickId = req.params.pickId;
    const pickCommentId = req.params.pickCommentId;

    // 내가 작성한 댓글만 삭제할 수 있도록 고치기
    if (!pickId) return res.send(errResponse(baseResponse.PICKCOMMENT_PICKID_EMPTY))
    if (!pickCommentId) return res.send(errResponse(baseResponse.PICKCOMMENT_COMMENTID_EMPTY))

    // 내가 쓴 댓글인지 확인
    const pickComUserIdCheck = await mentoringProvider.selectPickComUser(pickCommentId);
    console.log(pickComUserIdCheck[0].userId)

    if (userId !== pickComUserIdCheck[0].userId)
        return res.send(errResponse(baseResponse.PICKCOMMENT_USERID_WRONG))

    const deletePickMentorsComResponse = await mentoringService.deleteMentorsCom(
        pickId,
        pickCommentId
    )
    return res.send(deletePickMentorsComResponse);
}

/**
 * API No. 17
 * API Name : 멘티 구하는 글에 댓글 생성
 * [POST] /mentoring/mentees/{pickId}/comments
 */
exports.postPickMenteesCom = async function (req, res) {
    const userId = req.verifiedToken.userId;
    const pickId = req.params.pickId;
    const {contents} = req.body;

    if (!pickId) return res.send(errResponse(baseResponse.PICKCOMMENT_PICKID_EMPTY))
    if (!contents)
        return res.send(errResponse(baseResponse.PICKCOMMENT_COMMENTID_EMPTY))
    if (contents.length > 300)
        return res.send(errResponse(baseResponse.PICKCOMMENT_COMMENT_LENGTH))

    // userId가 댓글 단 사람 ID, pickId가 글 번호, role이 멘토인지 멘티인지, contents는 댓글 내용
    const postPickMenteesComResponse = await mentoringService.createMenteesCom(
        userId,
        pickId,
        contents
    )
    return res.send(postPickMenteesComResponse)

}

/**
 * API No. 18
 * API Name : 멘티 구하는 글에 댓글 조회
 * [GET] /mentoring/mentees/{pickId}/comments
 */
exports.getPickMenteesCom = async function (req, res){
    const userId = req.verifiedToken.userId;
    const pickId = req.params.pickId;
    let pickMenteesComListResult;

    if (!pickId) return res.send(errResponse(baseResponse.PICKCOMMENT_PICKID_EMPTY))

    // 1. status가 1이면 매칭 완료 안 된 구인 글 -> 댓글 전부 다 보여주기
    //                                         -> pick 글 쓴 사람한테는 댓글의 수락 버튼 보여지도록 하기
    const pickStatus = await mentoringProvider.pickStatusCheck(pickId) // pick의 status 확인
    console.log(pickStatus[0].status)
    if (pickStatus[0].status === 1)
        pickMenteesComListResult = await mentoringProvider.retrievePickMenteeComList(pickId); // 댓글 전부 보여주기
    // else if (pickStatus[0].status === 0)
    //     pickMenteesComListResult = await mentoringProvider.retrievePickMenteeCom(userId, pickId); // 매칭된 댓글만 보여주기
    return res.send(response(baseResponse.SUCCESS, pickMenteesComListResult))
    
}

/**
 * API No. 19
 * API Name : 멘티 구하는 글에 댓글 수정
 * [PATCH] /mentoring/mentees/{pickId}/comments/{pickCommentId}
 */
exports.patchPickMenteesCom = async function(req, res) {
    const userId = req.verifiedToken.userId;
    const {contents} = req.body;
    const pickId = req.params.pickId;
    const pickCommentId = req.params.pickCommentId;

    if (!pickId) return res.send(errResponse(baseResponse.PICKCOMMENT_PICKID_EMPTY))
    if (!pickCommentId) return res.send(errResponse(baseResponse.PICKCOMMENT_COMMENTID_EMPTY))

    // 내가 쓴 댓글인지 확인
    const pickComUserIdCheck = await mentoringProvider.selectPickComUser(pickCommentId);
    console.log(pickComUserIdCheck[0].userId)

    if (userId !== pickComUserIdCheck[0].userId)
        return res.send(errResponse(baseResponse.PICKCOMMENT_USERID_WRONG))

    if (!contents) return res.send(errResponse(baseResponse.PICKCOMMENT_COMMENT_EMPTY))
    if (contents.length > 300) return res.send(errResponse(baseResponse.PICKCOMMENT_COMMENT_LENGTH))

    const updatePickMentorsComResponse = await mentoringService.updateMenteesCom(
        contents,
        pickId,
        pickCommentId,
    );
    return res.send(updatePickMentorsComResponse);
}

/**
 * API No. 20
 * API Name : 멘티 구하는 글에 댓글 삭제
 * [PATCH] /mentoring/mentees/{pickId}/comments/{pickCommentId}
 */
exports.deletePickMenteesCom = async function(req, res){
    const userId = req.verifiedToken.userId;
    const pickId = req.params.pickId;
    const pickCommentId = req.params.pickCommentId;

    // 내가 작성한 댓글만 삭제할 수 있도록 고치기
    if (!pickId) return res.send(errResponse(baseResponse.PICKCOMMENT_PICKID_EMPTY))
    if (!pickCommentId) return res.send(errResponse(baseResponse.PICKCOMMENT_COMMENTID_EMPTY))

    // 내가 쓴 댓글인지 확인
    const pickComUserIdCheck = await mentoringProvider.selectPickComUser(pickCommentId);
    console.log(pickComUserIdCheck[0].userId)

    if (userId !== pickComUserIdCheck[0].userId)
        return res.send(errResponse(baseResponse.PICKCOMMENT_USERID_WRONG))

    const deletePickMentorsComResponse = await mentoringService.deleteMenteesCom(
        pickId,
        pickCommentId
    )
    return res.send(deletePickMentorsComResponse);
}


/**
 * API No. 21
 * API Name : 매칭 수락 버튼 API
 * [PATCH] /mentoring/mentors/{pickId}/comments/{pickCommentId}/matching
 */
exports.postMatching = async function(req, res){
    const userId = req.verifiedToken.userId;
    const pickId = req.params.pickId;
    const pickCommentId = req.params.pickCommentId;

    // 구인글 쓴 사람한테는 수락 버튼을 보여주기 -> pick 테이블의 userId가 로그인한 userId랑 같을 때만
    const userIdCheck = await mentoringProvider.userIdCheck(pickId); // pickId로 글쓴 userId 확인
    console.log(userIdCheck[0][0].userId, userId)
    if (userIdCheck[0][0].userId !== userId)
        return res.send(errResponse(baseResponse.MATCHING_USERID_WRONG))

    const pickStatus = await mentoringProvider.pickStatusCheck(pickId) // pick의 status 확인
    console.log(pickStatus[0].status)

    if (pickStatus[0].status === 0) // status가 0이면 매칭 완료된 구인글로 수락 버튼 클릭 불가능
        return res.send(errResponse(baseResponse.MATCHING_ACCEPT_INACTIVE))

    // status가 1이면 매칭 완료 안 된 구인글 -> 수락 시 pick의 userId 값과 
    // pickComment의 userId, pick의 subject를 matching 테이블에 insert
    const postMatchingResponse = await mentoringService.createMatching(
        userId,
        pickId,
        pickCommentId
    )
    return res.send(postMatchingResponse)
}


/**
 * API No. 22
 * API Name : 멘토링 내역 조회 API
 * [GET] /myPage/myMentoring
 */
exports.getMyMentoring = async function(req, res) {
    //const userId = req.verifiedToken.userId;
    const userId= 2;
    const mentoringListResponse = await mentoringProvider.mentoringList(userId);
    console.log(mentoringListResponse[0].state)
    
    // state가 양수면 활동 진행 중, 음수면 활동 종료
    return res.send(response(baseResponse.SUCCESS, mentoringListResponse))
}