module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const problem = require('./problemController');

    // 1. 궁금한 문제 작성 API
    app.post('/problems', /*jwtMiddleware,*/ problem.postProblems);



};
