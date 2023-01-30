module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const mentoring = require('./mentoringController');

    // 멘토 구인글 전체 조회 (최근 작성된 순서대로 조회)
    app.get('/mentoring/find-mentors', jwtMiddleware, mentoring.getPickMentors);

    // 멘티 구인글 전체 조회 (최근 작성된 순서대로 조회)
    app.get('/mentoring/find-mentees', jwtMiddleware, mentoring.getPickMentees);

    // 멘토 구인글 부분 조회 (최신 5개)
    app.get('/main/find-mentors', jwtMiddleware, mentoring.getPickMentorsMain);

    // 멘티 구인글 부분 조회 (최신 5개)
    app.get('/main/find-mentees', jwtMiddleware, mentoring.getPickMenteesMain);
};
