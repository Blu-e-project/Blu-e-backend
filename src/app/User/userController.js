const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
// const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
// const {emit} = require("nodemon");

/**
 * API No. 0
 * API Name : 테스트 API
 * [GET] /app/test
 */
exports.getTest = async function (req, res) {
    return res.send(response(baseResponse.SUCCESS))
};

/**
 * API No. 2
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