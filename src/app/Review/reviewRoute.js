module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const review = require('./reviewController');

    // 1. [멘티 -> 멘토] 리뷰 작성 API
    app.post('/reviews', jwtMiddleware, review.postReviews);

    // 2. [멘티 -> 멘토] 특정 유저에 대한 리뷰 조회 API
    app.get('/reviews/:userId', jwtMiddleware, review.getReviewById);

    // 특정유저가 쓴 리뷰 전체 조회//
    // 특정유저에 대한 리뷰 전체 조회//
    // 리뷰 전체 조회//

    // 3. [멘티 -> 멘토] 리뷰 수정 API
    app.patch('/reviews/:reviewId', jwtMiddleware, review.patchReviews);

    // 4. [멘티 -> 멘토] 리뷰 삭제 API
    app.delete('/reviews/:reviewId', jwtMiddleware, review.deleteReviews);

};