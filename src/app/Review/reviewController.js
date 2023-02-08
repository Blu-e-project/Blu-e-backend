const jwtMiddleware = require("../../../config/jwtMiddleware");
const reviewProvider = require("../../app/Review/reviewProvider");
const reviewService = require("../../app/Review/reviewService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API No. 1
 * API Name : [멘티 -> 멘토] 리뷰 작성 API
 * [POST] /mentor-reviews
 */
exports.postMentorReviews = async function (req, res){
    /**
     * Body: nickname(mentor), subject, contents
     */
    const userId = req.verifiedToken.userId; //멘티의 userId
    const {nickname, subject, contents} = req.body;

    //입력 정보 확인
    const nicknameCheck = await reviewProvider.nicknameCheck(nickname);
    if (!nicknameCheck[0].nicknameCheck == 0){
        return res.send(errResponse(baseResponse.REVIEW_NICKNAME_NOT_EXIST));
    };
    const matchingCheck = await reviewProvider.matchingCheck(userId, nickname, subject);
    if (matchingCheck[0].matchingCheck == 0) {
        return res.send(errResponse(baseResponse.REVIEW_MATCHING_NOT_EXIST));
    };
    //리뷰 작성 권한 확인
    const reviewCheck = await reviewProvider.reviewCheck(userId, nickname);
    if (reviewCheck[0].reviewCheck !== 0){
        return res.send(errResponse(baseResponse.REVIEW_REVIEW_EXIST));
    };
    
    
    // 빈 값 체크
    if (!nickname){
        return res.send(errResponse(baseResponse.REVIEW_NICKNAME_EMPTY));
    } else if (!subject) {
        return res.send(errResponse(baseResponse.REVIEW_SUBJECT_EMPTY));
    } else if (!contents) {
        return res.send(errResponse(baseResponse.REVIEW_CONTENTS_EMPTY));
    }
    // 길이 체크
    if (nickname.length > 7){
        return res.send(errResponse(baseResponse.REVIEW_NICKNAME_LENGTH));
    } else if (subject.length > 15){
        return res.send(errResponse(baseResponse.REVIEW_SUBJECT_LENGTH));
    } else if (contents.length > 300) {
        return res.send(errResponse(baseResponse.REVIEW_CONTENTS_LENGTH)); 
    }

    const postReviewResponse = await reviewService.createReview(
        userId,
        nickname,
        subject,
        contents
    );

    return res.send(postReviewResponse);
};

/**
 * API No. 2
 * API Name : [멘토 -> 멘티] 리뷰 작성 API
 * [POST] /mentee-reviews
 */
exports.postMenteeReviews = async function (req, res){
    /**
     * Body: nickname(mentee), subject, contents
     */
    const userId = req.verifiedToken.userId; //멘토의 userId
    const {nickname, subject, contents} = req.body;

    // 빈 값 체크
    if (!nickname){
        return res.send(errResponse(baseResponse.REVIEW_NICKNAME_EMPTY));
    } else if (!subject) {
        return res.send(errResponse(baseResponse.REVIEW_SUBJECT_EMPTY));
    } else if (!contents) {
        return res.send(errResponse(baseResponse.REVIEW_CONTENTS_EMPTY));
    }
    // 길이 체크
    if (nickname.length > 7){
        return res.send(errResponse(baseResponse.REVIEW_NICKNAME_LENGTH));
    } else if (subject.length > 15){
        return res.send(errResponse(baseResponse.REVIEW_SUBJECT_LENGTH));
    } else if (contents.length > 300) {
        return res.send(errResponse(baseResponse.REVIEW_CONTENTS_LENGTH)); 
    }

    const postReviewResponse = await reviewService.createReview(
        userId,
        nickname,
        subject,
        contents
    );

    return res.send(postReviewResponse);
};
/**
 * API No. 3
 * API Name : 특정 유저에 대한 리뷰 조회 API
 * [GET] /main/mentees/:userId/review
 * [GET] /main/mentors/:userId/review
 */
exports.getReviewById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.REVIEW_USERID_EMPTY));

    const reviewByUserId = await reviewProvider.retrieveReviewList(userId);
    return res.send(response(baseResponse.SUCCESS, reviewByUserId));
};

/**
 * API No. 4
 * API Name : 내가 쓴 리뷰 조회 API
 * [GET] /reviews/myReview
 */
exports.getReviewByMe = async function (req, res) {

    const userId = req.verifiedToken.userId;

    if (!userId) return res.send(errResponse(baseResponse.REVIEW_USERID_EMPTY));

    const reviewByUserId = await reviewProvider.retrieveMyReviewList(userId);
    return res.send(response(baseResponse.SUCCESS, reviewByUserId));
};

/**
 * API No. 5
 * API Name : 나에 대한 리뷰 조회 API
 * [GET] /reviews/aboutMeReview
 */
exports.getReviewAboutMe = async function (req, res) {

    const userId = req.verifiedToken.userId;

    if (!userId) return res.send(errResponse(baseResponse.REVIEW_USERID_EMPTY));

    const reviewByUserId = await reviewProvider.retrieveReviewList(userId);
    return res.send(response(baseResponse.SUCCESS, reviewByUserId));
};


/**
 * API No. 6
 * API Name : 리뷰 수정 API 
 * [PATCH] /reviews/:reviewId
 */
exports.patchMentorReviews = async function (req, res) {
    /**
     * Body: contents
     * Path Variable: reviewId
     */
    const {contents} = req.body;
    const reviewId = req.params.reviewId;

    // 빈 값 체크
    if (!contents) {
        return res.send(errResponse(baseResponse.REVIEW_CONTENTS_EMPTY));
    }
    if (!reviewId) return res.send(errResponse(baseResponse.REVIEW_USERID_EMPTY));
    // 길이 체크
    if (contents.length > 300) {
        return res.send(errResponse(REVIEW_CONTENTS_LENGTH)); 
    }
    if (!reviewId) return res.send(errResponse(baseResponse.REVIEW_USERID_EMPTY));
    const updateReviewResponse = await reviewService.updateReview(
        contents,
        reviewId
    );
    return res.send(updateReviewResponse);

};

/**
 * API No. 7
 * API Name : 리뷰 삭제 API
 * [DELETE] /reviews/:reviewId
 */

exports.deleteReviews = async function(req, res) {
    /**
     * Path Variable: reviewId
     */

    const reviewId = req.params.reviewId;

    if (!reviewId) return res.send(errResponse(baseResponse.REVIEW_USERID_EMPTY));

    const deleteReviewResponse = await reviewService.deleteReview(reviewId);
    return res.send(deleteReviewResponse);
};