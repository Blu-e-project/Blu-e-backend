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
 * API Name : 회원 가입 API
 * [POST] /users/signup
 */

exports.postSignUpMentor = async function (req, res) {
    // 자세한 body의 설명은 테이블 명세서 참조
    /**
     * Body: userId, id, password, phoneNum, name, nickname, birth, 
     * education, department, attendence, grade, currentStatus, address, 
     * introduce, hopeSubject, wishForMenteor, possibleSubject, 
     * wishForMentee, role, createdAt, updatedAt, status
     */

    const {id, password, phoneNum, name, nickname, birth, education, department, grade, address, introduce, role, status, userImg} = req.body;

    // 빈 값이 되면 안되는 속성값 체크
    if (!id)
        return res.send(response(baseResponse.SIGNUP_ID_EMPTY));
    else if (!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    else if (!phoneNum)
        return res.send(response(baseResponse.SIGNUP_PHONENUM_EMPTY));
    else if (!name)
        return res.send(response(baseResponse.SIGNUP_NAME_EMPTY));
    else if (!nickname)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
    else if (!birth)
        return res.send(response(baseResponse.SIGNUP_BIRTH_EMPTY));
    else if (!education)
        return res.send(response(baseResponse.SIGNUP_EDUCATION_EMPTY));

    // 길이 체크
    if (id.length > 35)
        return res.send(response(baseResponse.SIGNUP_ID_LENGTH));
    else if (password.length > 20)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_LENGTH));
    else if (phoneNum.length > 13)
        return res.send(response(baseResponse.SIGNUP_PHONENUM_LENGTH));
    else if (name.length > 7)
        return res.send(response(baseResponse.SIGNUP_NAME_LENGTH));  
    else if (nickname.length > 7)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_LENGTH));  
    else if (education.length > 20)
        return res.send(response(baseResponse.SIGNUP_EDUCATION_LENGTH));
    else if (department.length > 20)
        return res.send(response(baseResponse.SIGNUP_DEPARTMENT_LENGTH));
    else if (address.length > 20)
        return res.send(response(baseResponse.SIGNUP_ADDRESS_LENGTH));
    else if (introduce.length > 20)
        return res.send(response(baseResponse.SIGNUP_INTRODUCE_LENGTH));


    // 휴대폰 인증도 추가하기

    const signUpResponse = await userService.createMentor(
        id, password, phoneNum, name, nickname, birth, education, department, grade, address, introduce, role, status, userImg
    );
    
    return res.send(signUpResponse);
}


/**
 * API No. 2
 * API Name : 로그인
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
 * API Name : 멘토 전체 조회(최근 가입한 순)
 * [GET] /main/mentors
 */
exports.getMentor = async function (req, res) {

    const MentorListResult = await userProvider.retrieveMentorList();
    return res.send(response(baseResponse.SUCCESS, MentorListResult));
}


/**
 * API No. 4
 * API Name : 멘티 전체 조회(최근 가입한 순)
 * [GET] /main/mentees
 */
exports.getMentee = async function (req, res) {

    const MenteeListResult = await userProvider.retrieveMenteeList();
    return res.send(response(baseResponse.SUCCESS, MenteeListResult));
}


/**
 * API No. 5
 * API Name : 멘토 부분 조회(최신 5개)
 * [GET] /main/new-mentors
 */
exports.getNewMentor = async function (req, res) {

    const newMentorListResult = await userProvider.retrieveNewMentorList();
    return res.send(response(baseResponse.SUCCESS, newMentorListResult));
}


/**
 * API No. 6
 * API Name : 멘티 부분 조회(최신 5개)
 * [GET] /main/new-mentees
 */
exports.getNewMentee = async function (req, res) {

    const newMenteeListResult = await userProvider.retrieveNewMenteeList();
    return res.send(response(baseResponse.SUCCESS, newMenteeListResult));
}

/**
 * API No. 7
 * API Name : 특정 멘토 프로필 조회
 * [GET] /main/mentors/:userId
 */
exports.getMentorById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));
   // const isMentor=await userProvider.confirmMentor(userId);
    const mentorByuserId = await userProvider.retrieveMentor(userId);
    return res.send(response(baseResponse.SUCCESS, mentorByuserId));

};



/**
 * API No. 8
 * API Name : 특정 멘티 프로필 조회
 * [GET] /main/mentees/:userId
 */
exports.getMenteeById = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;

    if (!userId) return res.send(errResponse(baseResponse.USER_USERID_EMPTY));

    const menteeByuserId = await userProvider.retrieveMentee(userId);
    return res.send(response(baseResponse.SUCCESS, menteeByuserId));
};