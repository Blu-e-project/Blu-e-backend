const jwtMiddleware = require('../../../config/jwtMiddleware');

// 예시 파일
module.exports = function(app){
    const user = require('./userController');

    // test 조회
    app.get('/',user.getTest);

    // 프론트 측에서만 멘토 멘티 나누고 회원가입은 하나로 묶어도 괜찮을 듯
    // 1. 멘토 회원 가입 API
    app.post('/users/signup/mentor', user.postSignUpMentor);
    // 멘티 회원 가입 API
    //app.post('/users/signup/mentee', user.postSignUpMentee);

    // 2. 로그인 API (JWT 생성)
    app.post('/users/login', user.login);

    // 멘토 전체 조회(최근 가입한 순)
    app.get('/main/mentors', jwtMiddleware, user.getMentor);

    // 멘티 전체 조회(최근 가입한 순)
    app.get('/main/mentees', jwtMiddleware, user.getMentee);

};
