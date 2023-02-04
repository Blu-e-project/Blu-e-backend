module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const review = require('./reviewController');

    // 1. [멘티 -> 멘토] 리뷰 작성 API
    app.post('/mentor-reviews', /*jwtMiddleware,*/ review.postMentorReviews);

    // 2. [멘토 -> 멘티] 리뷰 작성 API
    app.post('/mentee-reviews', /*jwtMiddleware,*/ review.postMenteeReviews);

    // 3. 특정 유저에 대한 리뷰 조회 API(멘토 프로필) -> user폴더로 이동
    app.get('/main/mentees/:userId/review', /*jwtMiddleware,*/ review.getReviewById);

    // 4. 내가 쓴 리뷰 조회 API(내가 쓴 글, 댓글 쓴 글) ->마이페이지로 이동
    app.get('/reviews/myReview', /*jwtMiddleware,*/ review.getReviewByMe);

    // 5. 나에 대한 리뷰 조회 API(마이페이지 -> 리뷰)
    app.get('/reviews/aboutMeReview', /*jwtMiddleware,*/ review.getReviewForMe);

    // 6. [멘티 -> 멘토] 리뷰 수정 API
    app.patch('/reviews/:reviewId', /*jwtMiddleware,*/ review.patchMentorReviews);

    // 7. [멘토 -> 멘티] 리뷰 수정 API
    app.patch('/reviews/:reviewId', /*jwtMiddleware,*/ review.patchMenteeReviews);//?????

    // 8. 리뷰 삭제 API
    app.delete('/reviews/:reviewId', /*jwtMiddleware,*/ review.deleteReviews);

};