module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const myPage = require('./myPageController');

    // 1. 내가 쓴 멘토 구인글 조회 API
    app.get('/myPage/myMentorPick', jwtMiddleware, myPage.getPickMentorsByMe);

    // 2. 내가 쓴 멘티 구인글 조회 API
    app.get('/myPage/myMenteePick', jwtMiddleware, myPage.getPickMenteesByMe);

    // 3. 내가 댓글 쓴 멘토 구인글 조회 API
    // app.get('/myPage/myMentorComPick', jwtMiddleware, myPage.getPickMenteesByMyCom);

    // 4. 내가 댓글 쓴 멘티 구인글 조회 API
    // app.get('/myPage/myMenteeComPick', jwtMiddleware, myPage.getPickMenteesByMyCom);
   
};