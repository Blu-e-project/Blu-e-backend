// 예시 파일
module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const question = require('./questionController');

    // 작성한 Q&A 조회 API
    app.get('/service/questions', jwtMiddleware, question.getQuestion);

    // 특정 Q&A 조회 API
    app.get('/service/questions/:questionId', jwtMiddleware, question.getQuestionByQuestionId);

    // Question 생성 API
    app.post('/service/questions/writing', jwtMiddleware, question.postQuestion);

    // Question 삭제 API
    app.delete('/service/questions/:questionId', jwtMiddleware, question.deleteQuestion);

};