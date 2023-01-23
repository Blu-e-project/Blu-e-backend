const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const jwtMiddleware = require("../../../config/jwtMiddleware");
//const jwt = require("jsonwebtoken");
//const secret_config = require("../../../config/secret");


exports.createMentor = async function (userId, id, password, phoneNum, name, nickname, birth, education, department, attendence, grade, currentStatus, address, introduce, hopeSubject, wishForMenteor,
    possibleSubject, wishForMentee, role, createdAt, updatedAt, status) {
        try{
            // 아이디 중복 확인
            const idRows = await userProvider.idCheck(id); // Read인 Provider 통해서 확인
            if (idRows.length > 0)
                return errResponse(baseResponse.SIGNUP_REDUNDANT_ID)
            
            // INSERT할 Params
            const insertUserParams = [userId, id, password, phoneNum, name, nickname, birth, education, department, attendence, grade, currentStatus, address, introduce, hopeSubject, wishForMenteor,
                possibleSubject, wishForMentee, role, createdAt, updatedAt, status];

            const connection = await pool.getConnection(async (conn) => conn);

            // Dao로 user를 실제로 insert
            const userIdResult = await userDao.insertUser(connection, insertUserParams);
            console.log(`추가된 회원: ${userIdResult[0]} `)
            connection.release();

            return response(baseResponse.SUCCESS);

        } catch (err){
            logger.error(`App - createMentor Service error\n: ${err.message}`);
            return errResponse(baseResponse.DB_ERROR);
        }
};

exports.postSignIn = async function(id, password) {
    try {
        // 아이디 존재 확인
        const idRows = await userProvider.idCheck(id);
        if (idRows.length < 1)
            return errResponse(baseResponse.SIGNIN_ID_WRONG);

        const selectId = idRows[0].id
        const selectUserPasswordParams = [selectId, password];
        const passwordRows = await userProvider.passwordCheck(selectUserPasswordParams)

        // DB에 있는 비밀번호와 입력된 비밀번호 값이 다르면 에러 메세지
        // 왜 이럴까...
        console.log(passwordRows[0], passwordRows[0].password, password)
        if (passwordRows[0].password !== password) {
            return errResponse(baseResponse.SIGNIN_PASSWORD_WRONG)
        }

        // 계정 상태 확인
        const userInfoRows = await userProvider.accountCheck(id);

        if (userInfoRows[0].status === 0) {
            return errResponse(baseResponse.SIGNIN_INACTIVE_ACCOUNT);
        } else if (userInfoRows[0].status === 1) {
            return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
        }

        console.log(userInfoRows[0].userId)

        // 토큰 생성
        let token = await jwt.sign(
            {
                userId: userInfoRows[0].userId,
            }, // 토큰 내용
            secret_config.jwtsecret, 
            // 유효기간 365일
            {
                expiresIn: "365d",
                subject: "user"
            }
        );
        return response(baseResponse.SUCCESS, {'userId': userInfoRows[0].id, 'jwt': token});

    } catch {
        logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.createQuestion = async function (title, contents, userId) {
    try {
        const insertQuestionInfoParams = [title, contents, userId];
        console.log(insertQuestionInfoParams);

        const connection = await pool.getConnection(async (conn) => conn);

        const QuestionResult = await userDao.insertQuestionInfo(connection, insertQuestionInfoParams);
        
        console.log(`추가된 Question : ${QuestionResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createQuestion Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};