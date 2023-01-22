// 예시 파일
module.exports = function(app){
    const user = require('./userController');

    // test 조회
    app.get('/',user.getTest);

    // 작성한 Q&A 조회
    app.get('/service/questions/:userId',user.getQuestion);

};
