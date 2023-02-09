const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");

// secret_sms가 ignore파일에 있어서 인증번호 서비스 필요시 연락바람!
const secret_key = require("../../../config/secret_sms");

// 인증번호 사용시 밑에 3가지 install 필요 
const axios = require('axios');
const Cache = require('memory-cache');
const CryptoJS = require('crypto-js');

const date = Date.now().toString();
const uri = secret_key.NCP_serviceID;
const secretKey = secret_key.NCP_secretKey;
const accessKey = secret_key.NCP_accessKEY;
const method = 'POST';
const space = " ";
const newLine = "\n";
const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
const url2 = `/sms/v2/services/${uri}/messages`;

const  hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);

hmac.update(method);
hmac.update(space);
hmac.update(url2);
hmac.update(newLine);
hmac.update(date);
hmac.update(newLine);
hmac.update(accessKey);

const hash = hmac.finalize();
const signature = hash.toString(CryptoJS.enc.Base64);

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
 * API Name : 휴대폰 인증 번호 발송
 * [POST] /users/send
 */
exports.send = async function (req, res) {
    const phoneNumber = req.body.phoneNum;

    Cache.del(phoneNumber);
  
    //인증번호 생성
    const verifyCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  
    Cache.put(phoneNumber, verifyCode.toString());
  
    axios({
      method: method,
      json: true,
      url: url,
      headers: {
        'Content-Type': 'application/json',
        'x-ncp-iam-access-key': accessKey,
        'x-ncp-apigw-timestamp': date,
        'x-ncp-apigw-signature-v2': signature,
      },
      data: {
        type: 'SMS',
        contentType: 'COMM',
        countryCode: '82',
        // from은 발송번호
        from: '',
        content: `[본인 확인] 인증번호 [${verifyCode}]를 입력해주세요.`,
        messages: [
          {
            to: `${phoneNumber}`,
          },
        ],
      }, 
      })
    .then(function (res) {
      console.log('response',res.data, res['data']);
      res.send(response(baseResponse.SUCCESS));
      //res.json({isSuccess: true, code: 202, message: "본인인증 문자 발송 성공", result: res.data });
    })
    .catch((err) => {
      // console.log(err.res);
      if(err.res == undefined){
        res.send(response(baseResponse.SUCCESS));
        //res.json({isSuccess: true, code: 200, message: "본인인증 문자 발송 성공", result: res.data });
      }
      else res.sned(errResponse(baseResponse.SMS_SEND_FAILURE));
      //res.json({isSuccess: true, code: 204, message: "본인인증 문자 발송에 문제가 있습니다.", result: err.res });
    });
};

/**
 * API No. 2
 * API Name : 테스트 API
 * [POST] /users/verify
 */
exports.verify = async function (req, res) {
    const phoneNumber = req.body.phoneNum;
    const verifyCode = req.body.verifyCode;

    const CacheData = Cache.get(phoneNumber);

    if (!CacheData) {
        return res.send(errResponse(baseResponse.FAILURE_SMS_AUTHENTICATION));
    } else if (CacheData !== verifyCode) {
        return res.send(errResponse(baseResponse.FAILURE_SMS_AUTHENTICATION));
    } else {
      Cache.del(phoneNumber);
      return res.send(response(baseResponse.SUCCESS));     
    }
  };

/**
 * API No. 3
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
 * API No. 4
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
 * API No. 5
 * API Name : 멘토 전체 조회(최근 가입한 순)
 * [GET] /main/mentors
 */
exports.getMentor = async function (req, res) {

    const MentorListResult = await userProvider.retrieveMentorList();
    return res.send(response(baseResponse.SUCCESS, MentorListResult));
}


/**
 * API No. 6
 * API Name : 멘티 전체 조회(최근 가입한 순)
 * [GET] /main/mentees
 */
exports.getMentee = async function (req, res) {

    const MenteeListResult = await userProvider.retrieveMenteeList();
    return res.send(response(baseResponse.SUCCESS, MenteeListResult));
}


/**
 * API No. 7
 * API Name : 멘토 부분 조회(최신 5개)
 * [GET] /main/new-mentors
 */
exports.getNewMentor = async function (req, res) {

    const newMentorListResult = await userProvider.retrieveNewMentorList();
    return res.send(response(baseResponse.SUCCESS, newMentorListResult));
}


/**
 * API No. 8
 * API Name : 멘티 부분 조회(최신 5개)
 * [GET] /main/new-mentees
 */
exports.getNewMentee = async function (req, res) {

    const newMenteeListResult = await userProvider.retrieveNewMenteeList();
    return res.send(response(baseResponse.SUCCESS, newMenteeListResult));
}

/**
 * API No. 9
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
 * API No. 10
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


/**
 * API No. 11
 * API Name : 아이디 찾기
 * [GET] /users/id
 */

exports.findId = async function (req, res) {
    const phoneNum = req.body.phoneNum;

    const findIdResponse = await userProvider.retrieveIdByPhone(phoneNum);
    console.log(findIdResponse.length)
    if (findIdResponse.length <= 0)
        return res.send(errResponse(baseResponse.FIND_ID_WRONG));

    return res.send(response(baseResponse.SUCCESS, findIdResponse));
}


/**
 * API No. 12
 * API Name : 비밀번호 재설정
 * [GET] /users/password
 */
exports.resetPassword = async function (req, res) {
    const {id, phoneNum, password, password_check} = req.body

    if (!id) 
        return res.send(errResponse(baseResponse.RESETPASSWORD_ID_EMPTY));
    else if (!password)
        return res.send(errResponse(baseResponse.RESETPASSWORD_PASSWORD_EMPTY));
    else if (!password_check)
        return res.send(errResponse(baseResponse.RESETPASSWORD_PASSWORDCHECK_EMPTY));

    if (id.length > 35)
        return res.send(errResponse(baseResponse.RESETPASSWORD_ID_LENGTH));
    else if (password.length > 20)
        return res.send(errResponse(baseResponse.RESETPASSWORD_PASSWORD_LENGTH));
    
    // 가입했는지 확인
    const findIdResponse = await userProvider.retrieveIdByPhone(phoneNum);
    if (findIdResponse.length <= 0)
        return res.send(errResponse(baseResponse.FIND_ID_WRONG));
    else if (findIdResponse[0].id !== id)
        return res.send(errResponse(baseResponse.RESETPASSWORD_ID_WRONG));
    console.log(findIdResponse[0].id);

    if (password !== password_check)
        return res.send(errResponse(baseResponse.RESETPASSWORD_PASSWORD_WRONG));
    
    const resetPasswordResponse = await userService.patchResetPassword(id, password);
    //console.log(resetPasswordResponse);
    return res.send(resetPasswordResponse);
}