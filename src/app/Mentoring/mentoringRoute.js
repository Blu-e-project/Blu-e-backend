module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const mentoring = require('./mentoringController');

    // 1. 멘토 구인글 조회 API (최근 작성된 순서대로 조회)
    app.get('/mentoring/find-mentors', jwtMiddleware, mentoring.getPickMentors);

    // 2. 멘티 구인글 조회 API (최근 작성된 순서대로 조회)
    app.get('/mentoring/find-mentees', jwtMiddleware, mentoring.getPickMentees);
 
};
