module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const problem = require('./problemController');

    // 1. 궁금한 문제 작성 API
    app.post('/problems', jwtMiddleware, problem.postProblems);

    // 2. 궁금한 문제 조회 API (최근 작성된 순서대로 조회)
    app.get('/problems', jwtMiddleware, problem.getProblems);

    // 3. 특정 문제 조회 API
    app.get('/problems/:problemId', jwtMiddleware, problem.getProblemById);

    // 4. 특정 문제 삭제 API
    app.delete('/problems/:problemId', jwtMiddleware, problem.deleteProblems);

   // 5. 해답 작성 API
   app.post('/problems/:problemId/solutions', jwtMiddleware, problem.postSolutions);

   // 6. 해답 조회 API
   app.get('/problems/:problemId/solutions', jwtMiddleware, problem.getSolutions);

   // 7. 해답 수정 API
   app.patch('/problems/:problemId/solutions/:solutionId', jwtMiddleware, problem.patchSolutions);

   // 8. 해답 삭제 API
   app.delete('/problems/:problemId/solutions/:solutionId', jwtMiddleware, problem.deleteSolutions);
};
