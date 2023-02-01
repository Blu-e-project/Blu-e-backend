const jwtMiddleware = require("../../../config/jwtMiddleware");
const reviewProvider = require("../../app/Review/reviewProvider");
const reviewService = require("../../app/Review/reviewService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/**
 * API No. 1
 * API Name : [멘티 -> 멘토] 리뷰 작성 API
 * [POST] /reviews
 */
exports.postReviews = async function (req, res){
    /**
     * Body: name, subject, contents
     */
    // const userId = req.verifiedToken.userId;
    const {name, subject, contents} = req.body;

    // 빈 값 체크
    if (!name){
        return res.send(response());
    } else if (!subject) {
        return res.send(response());
    } else if (!contents) {
        return res.send(response());
    }
    // 길이 체크
    if (name.length > 7){
        return res.send(response());
    } else if (subject.length > 15){
        return res.send(response());
    } else if (contents.length > 300) {
        return res.send(response()); 
    }

    const postReviewResponse = await reviewService.createReview(
        userId,
        name,
        subject,
        contents
    );

    return res.send(postReviewResponse);
};

// /**
//  * API No. 2
//  * API Name : [멘티 -> 멘토] 리뷰 전체 조회 API
//  * [GET] /reviews
//  */
// exports.getReviews = async function (req, res){

//     // const userId = req.verifiedToken.userId;

//     const reviewListResult = await reviewProvider.retrieveReviewList();
//     return res.send(response(baseResponse.SUCCESS, reviewListResult));
// };

/**
 * API No. 2
 * API Name : [멘티 -> 멘토] 특정 유저에 대한 리뷰 조회 API
 * [GET] /reviews/:userId
 */
exports.getReviewById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse());

    const reviewByUserId = await reviewProvider.retrieveReview(userId);
    return res.send(response(baseResponse.SUCCESS, reviewByUserId));
};

/**
 * API No. 3
 * API Name : [멘티 -> 멘토] 리뷰 수정 API 
 * [PATCH] /reviews/:reviewId
 */
exports.patchReviews = async function (req, res) {
    /**
     * Body: name, subject, contents
     * Path Variable: reviewId
     */
    const {name, subject, contents} = req.body;
    const reviewId = req.params.reviewId;

    // 빈 값 체크
    if (!name){
        return res.send(response());
    } else if (!subject) {
        return res.send(response());
    } else if (!contents) {
        return res.send(response());
    }
    // 길이 체크
    if (name.length > 7){
        return res.send(response());
    } else if (subject.length > 15){
        return res.send(response());
    } else if (contents.length > 300) {
        return res.send(response()); 
    }
    
    const updateReviewResponse = await reviewService.updateReview(
        name,
        subject,
        contents,
        reviewId
    );
    return res.send(updateReviewResponse);

};

/**
 * API No. 4
 * API Name : [멘티 -> 멘토] 리뷰 삭제 API
 * [DELETE] /reviews/:reviewId
 */

exports.deleteReviews = async function(req, res) {
    /**
     * Path Variable: reviewId
     */

    const reviewId = req.params.reviewId;

    if (!reviewId) return res.send(errResponse());

    const deleteReviewResponse = await reviewService.deleteReview(reviewId);
    return res.send(deleteReviewResponse);
};