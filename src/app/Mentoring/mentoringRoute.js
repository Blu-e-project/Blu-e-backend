module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const mentoring = require('./mentoringController');

    // 멘토 구인글 전체 조회 (최근 작성된 순서대로 조회)
    app.get('/mentoring/find-mentors', jwtMiddleware, mentoring.getPickMentors);

    // 멘티 구인글 전체 조회 (최근 작성된 순서대로 조회)
    app.get('/mentoring/find-mentees', jwtMiddleware, mentoring.getPickMentees);

    // 멘토 구인글 부분 조회 (조회수 많은 순 5개)
    app.get('/main/hot-mentors', jwtMiddleware, mentoring.getPickMentorsMain);

    // 멘티 구인글 부분 조회 (조회수 많은 순 5개)
    app.get('/main/hot-mentees', jwtMiddleware, mentoring.getPickMenteesMain);

    // 멘토 구인글 생성
    app.post('/mentoring/mentors', jwtMiddleware, mentoring.postPickMentors);

    // 멘티 구인글 생성
    app.post('/mentoring/mentees', jwtMiddleware, mentoring.postPickMentees);

    // 특정 멘토 구인글 조회
    app.get('/mentoring/mentors/:pickId', jwtMiddleware, mentoring.getPickMentorsById);

    // 특정 멘티 구인글 조회
    app.get('/mentoring/mentees/:pickId', jwtMiddleware, mentoring.getPickMenteesById);

    // 멘토 구인글 수정
    app.patch('/mentoring/mentors/:pickId', jwtMiddleware, mentoring.patchPickMentor);

    // 멘티 구인글 수정
    app.patch('/mentoring/mentees/:pickId', jwtMiddleware, mentoring.patchPickMentee);

    // 멘토 구인글 삭제
    app.delete('/mentoring/mentors/:pickId', jwtMiddleware, mentoring.deletePickMentor);

    // 멘티 구인글 삭제
    app.delete('/mentoring/mentees/:pickId', jwtMiddleware, mentoring.deletePickMentee);
    
    // 멘토 구인글 댓글 생성
    app.post('/mentoring/mentors/:pickId/comments', jwtMiddleware, mentoring.postPickMentorsCom);
    
    // 멘토 구인글 댓글 조회
    app.get('/mentoring/mentors/:pickId/comments', jwtMiddleware, mentoring.getPickMentorsCom);
    
    // 멘토 구인글 댓글 수정
    app.patch('/mentoring/mentors/:pickId/comments/:pickCommentId', jwtMiddleware, mentoring.patchPickMentorsCom)
    
    // 멘토 구인글 댓글 삭제
    app.delete('/mentoring/mentors/:pickId/comments/:pickCommentId', jwtMiddleware, mentoring.deletePickMentorsCom)

    // 멘티 구인글 댓글 생성
    app.post('/mentoring/mentees/:pickId/comments', jwtMiddleware, mentoring.postPickMenteesCom);
    
    // 멘티 구인글 댓글 조회
    app.get('/mentoring/mentees/:pickId/comments', jwtMiddleware, mentoring.getPickMenteesCom);
    
    // 멘티 구인글 댓글 수정
    app.patch('/mentoring/mentees/:pickId/comments/:pickCommentId', jwtMiddleware, mentoring.patchPickMenteesCom)
    
    // 멘티 구인글 댓글 삭제
    app.delete('/mentoring/mentees/:pickId/comments/:pickCommentId', jwtMiddleware, mentoring.deletePickMenteesCom)

    // 매칭 수락
    app.post('/mentoring/mentors/:pickId/comments/:pickCommentId/matching', jwtMiddleware, mentoring.postMatching);

    app.get('/myPage/myMentoring',  mentoring.getMyMentoring);
};
