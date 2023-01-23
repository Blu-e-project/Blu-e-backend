const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS))
};

/**
 * API No. 1
 * API Name : 멘토 회원 가입 API
 * [POST] /users/signup/mentor
 */

exports.postSignUpMentor = async function (req, res) {
    // 자세한 body의 설명은 테이블 명세서 참조
    /**
     * Body: userId, id, password, phoneNum, name, nickname, birth, 
     * education, department, attendence, grade, currentStatus, address, 
     * introduce, hopeSubject, wishForMenteor, possibleSubject, 
     * wishForMentee, role, createdAt, updatedAt, status
     */

    const {userId, id, password, phoneNum, name, nickname, birth, education, department, attendence, grade, currentStatus, address, introduce, hopeSubject, wishForMenteor,
        possibleSubject, wishForMentee, role, createdAt, updatedAt, status} = req.body;

    // 빈 값이 되면 안되는 속성값 체크
    if (!userId || !id || !password || !phoneNum || !name || !nickname || !attendence || !role || !createdAt || !updatedAt || !status)
        return res.send(response(baseResponse.SIGNUP_ID_EMPTY)); // response 메세지는 추후 추가 및 수정하기

    // 길이 체크
    // 프론트에서 다 유효성 검증하고 들어오는지 확인 후 추가하기
    if (id.length > 35)
        return res.send(response(baseResponse.SIGNUP_ID_LENGTH));
    if (password.length > 20)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));


    // 휴대폰 인증도 추가하기

    const signUpResponse = await userService.createMentor(
        userId, id, password, phoneNum, name, nickname, birth, education, department, attendence, grade, currentStatus, address, introduce, hopeSubject, wishForMenteor,
        possibleSubject, wishForMentee, role, createdAt, updatedAt, status
    );
    
    return res.send(signUpResponse);
}

/*
// 멘티 회원 가입 API
// [POST] /users/signup/mentee
exports.postSignUpMentee = async function(req, res){
    const {userId, id, password, phoneNum, name, nickname, birth, education, department, attendence, grade, currentStatus, address, introduce, hopeSubject, wishForMenteor,
        possibleSubject, wishForMentee, role, createdAt, updatedAt, status} = req.body;

    if (!userId || !id || !password || !phoneNum || !name || !nickname || !attendence || !role || !createdAt || !updatedAt || !status)
        return res.send(response(baseResponse.SIGNUP_ID_EMPTY));

} 
*/

/**
 * API No. 2
 * API Name : 유저별 작성한 Q&A 조회
 * [POST] /users/login
 * id, password
 */
exports.login = async function (req, res) {
    const {id, password} = req.body;

    const signInResponse = await userService.postSignIn(id, password);

    return res.send(signInResponse);
}

/**
 * API No. 3
 * API Name : 유저별 작성한 Q&A 조회
 * [GET] /service/questions/{userId}
 */
exports.getQuestion = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;
    console.log(userId);
    if (!userId) return res.send('오류 발생');

    const QuestionByUserId = await userProvider.retrieveQuestion(userId);
    return res.send(response(baseResponse.SUCCESS, QuestionByUserId));
};

/**
 * API No. 2
 * API Name : Q&A 생성 API
 * [POST] /service/questions/:userId/writing
 */
exports.postQuestion = async function (req, res) {

    /**
     * Body: userId, title, contents
     */
    const {userId, title, contents} = req.body;
    console.log(req.body.title);
    // 빈 값 체크
    if (!userId) return res.send('오류 발생');

    // 빈 값 체크
    if (!title)
        return res.send('제목이 비어있습니다.');

    // 빈 값 체크
    if (!contents)
        return res.send('글내용이 비어있습니다.');


    const createQuestionResponse = await userService.createQuestion(
        title,
        contents,
        userId,
    );

    return res.send(createQuestionResponse);
};