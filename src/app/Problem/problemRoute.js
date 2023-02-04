module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const problem = require('./problemController');

    // 1. 궁금한 문제 작성 API
    app.post('/problems', jwtMiddleware, problem.postProblems);

    // 2. 궁금한 문제 조회 API (최근 작성된 순서대로 조회)
    app.get('/problems', jwtMiddleware, problem.getProblems);

    // 3. 특정 문제 조회 API
    app.get('/problems/:problemId', jwtMiddleware, problem.getProblemById);

    // 4 . 내가 질문한 문제 조회 API
    app.get('/problemByMe', jwtMiddleware, problem.getProblemByMe);

    // 5. 특정 문제 삭제 API
    app.delete('/problems/:problemId', jwtMiddleware, problem.deleteProblems);

    // 6. 해답 작성 API
   app.post('/problems/:problemId/solutions', jwtMiddleware, problem.postSolutions);

    // 7. 해답 조회 API
   app.get('/problems/:problemId/solutions', jwtMiddleware, problem.getSolutions);

   // 8. 내가 쓴 해답 조회 API
   app.get('/solutionByMe', jwtMiddleware, problem.getSolutionsByMe);

    // 9. 해답 수정 API
   app.patch('/problems/:problemId/solutions/:solutionId', jwtMiddleware, problem.patchSolutions);

    // 10. 해답 삭제 API
   app.delete('/problems/:problemId/solutions/:solutionId', jwtMiddleware, problem.deleteSolutions);
   

   //내가 쓴 글 조회 -> 문제 전체조회 쿼리에 where userId=? 조건만 붙이면 될 듯
   //내가 쓴 댓글 + 그 댓글이 달린 질문글 조회
};
