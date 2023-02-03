const jwtMiddleware = require("../../../config/jwtMiddleware");
const questionProvider = require("../../app/Question/questionProvider");
const questionService = require("../../app/Question/questionService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

// const regexEmail = require("regex-email");
const {emit} = require("nodemon");

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
    if (!userId) return res.send(response(baseResponse.QUESTION_USERID_EMPTY));

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

    if (!userId) return res.send(response(baseResponse.QUESTION_USERID_EMPTY));
    if (!title) return res.send(response(baseResponse.QUESTION_TITLE_EMPTY));
    if (!contents) return res.send(response(baseResponse.QUESTION_CONTENTS_EMPTY));

    if (title.length > 20) 
        return res.send(response(baseResponse.QUESTION_TITLE_LENGTH));

    if (contents.length > 500)
        return res.send(response(baseResponse.QUESTION_CONTENTS_LENGTH));


    const createQuestionResponse = await questionService.createQuestion(
        title,
        contents,
        userId,
    );

    return res.send(createQuestionResponse);
};


/**
 * API No. 3
 * API Name : Question 삭제 API
 * [DELETE] /service/questions/:userId/writing/:questionId
 */

exports.deleteQuestion = async function(req, res) {
    /**
     * Path Variable: questionId
     */

    const questionId = req.params.questionId;

    if (!questionId) return res.send(errResponse(baseResponse.QUESTION_QUESTIONID_EMPTY));

    const deleteQuestionResponse = await questionService.deleteQuestion(questionId);
    return res.send(deleteQuestionResponse);
}