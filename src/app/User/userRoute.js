// 예시 파일
module.exports = function(app){
    const user = require('./userController');

    app.get('/',user.getTest);

    // 1. 회원가입 API
    app.post('/api/users', user.postUsers);


};
