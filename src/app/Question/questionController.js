const jwtMiddleware = require("../../../config/jwtMiddleware");
const questionProvider = require("../../app/Question/questionProvider");
const questionService = require("../../app/Question/questionService");
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
 * API Name : 유저별 작성한 Q&A 조회
 * [GET] /service/questions/:userId
 */
exports.getQuestion = async function (req, res) {

    /**
     * Path Variable: userId
     */
    const userId = req.params.userId;
    console.log(userId);
    if (!userId) return res.send('오류 발생');

    const QuestionByUserId = await questionProvider.retrieveQuestion(userId);
    return res.send(response(baseResponse.SUCCESS, QuestionByUserId));
};

/**
 * API No. 2
 * API Name : Question 생성 API
 * [POST] /service/questions/:userId/writing
 */
exports.postQuestion = async function (req, res) {

    /**
     * Path Variable: userId
     * Body: title, contents
     */
    const userId = req.params.userId;
    const {title, contents} = req.body;

    // 빈 값 체크
    if (!userId) return res.send('오류 발생');

    // 빈 값 체크
    if (!title)
        return res.send('제목이 비어있습니다.');

    // 빈 값 체크
    if (!contents)
        return res.send('글내용이 비어있습니다.');


    const createQuestionResponse = await questionService.createQuestion(
        title,
        contents,
        userId,
    );

    return res.send(createQuestionResponse);
};



/**
 * API No. 3
 * API Name : Question 수정
 * [PATCH] /service/questions/:userId/writing/:questionId
 * path variable : questionId
 * body : title, contents
 */
exports.patchQuestion = async function (req, res) {

    const userId = req.params.userId;
    const questionId = req.params.questionId;

    const title = req.body.title;
    const contents = req.body.contents;

    // 빈 값 체크
    if (!userId) return res.send('오류 발생');

    // 빈 값 체크

    if (!questionId) return res.send('오류 발생');

    // 빈 값 체크
    if (!title)
        return res.send('제목이 비어있습니다.');

    // 빈 값 체크
    if (!contents)
        return res.send('글내용이 비어있습니다.');

    const updateQuestionResponse = await questionService.editQuestion(
        title,
        contents,
        userId,
        questionId,
    );

    return res.send(updateQuestionResponse);
};


/**
 * API No. 4
 * API Name : 답변이 필요한 질문 조회
 * [GET] /service/questions
 */
exports.getQuestionNeedingAnswer = async function (req, res) {

    const QuestionNeedingAnswer = await questionProvider.retrieveQuestionNeedingAnswer();
    return res.send(response(baseResponse.SUCCESS, QuestionNeedingAnswer));
};



/**
 * API No. 5
 * API Name : Question 삭제 API
 * [DELETE] /service/questions/:userId/writing/:questionId
 */

exports.deleteQuestion = async function(req, res) {
    /**
     * Path Variable: questionId
     */

    const questionId = req.params.questionId;

    if (!questionId) return res.send("questionId 오류");

    const deleteQuestionResponse = await questionService.deleteQuestion(questionId);
    return res.send(deleteQuestionResponse);
}