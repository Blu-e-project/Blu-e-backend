module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const problem = require('./problemController');

    // 1. 궁금한 문제 작성 API
    app.post('/problems', /*jwtMiddleware,*/ problem.postProblems);

    // 2. 궁금한 문제 조회 API (최근 작성된 순서대로 조회)
    app.get('/problems', /*jwtMiddleware,*/ problem.getProblems);

    // 3. 특정 문제 조회 API
    app.get('/problems/:problemId', /*jwtMiddleware,*/ problem.getProblemById);
};
