// 예시 파일
module.exports = function(app){
    const jwtMiddleware = require("../../../config/jwtMiddleware");
    const question = require('./questionController');

    // 작성한 Q&A 조회 API
    app.get('/service/questions/:userId', jwtMiddleware, question.getQuestion);

    // Question 생성 API
    app.post('/service/questions/:userId/writing', jwtMiddleware, question.postQuestion);

    // Question 삭제 API
    app.delete('/service/questions/:userId/writing/:questionId', jwtMiddleware, question.deleteQuestion);

};