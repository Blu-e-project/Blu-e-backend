// 예시 파일
module.exports = function(app){
    const question = require('./questionController');

    // test 조회
    app.get('/',question.getTest);

    // 작성한 Q&A 조회
    app.get('/service/questions/:userId',question.getQuestion);

    // Question 생성 API
    app.post('/service/questions/:userId/writing', question.postQuestion);

    // Question 수정 API
    app.post('/service/questions/:userId/writing/:questionId', question.patchQuestion);

};
