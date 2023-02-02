const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const questionProvider = require("./questionProvider");
const questionDao = require("./questionDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");
const jwtMiddleware = require("../../../config/jwtMiddleware");
//const jwt = require("jsonwebtoken");
const secret_config = require("../../../config/secret");

exports.createQuestion = async function (title, contents, userId) {
    try {
        const insertQuestionInfoParams = [title, contents, userId];
        console.log(insertQuestionInfoParams);

        const connection = await pool.getConnection(async (conn) => conn);

        const QuestionResult = await questionDao.insertQuestionInfo(connection, insertQuestionInfoParams);
        
        console.log(`추가된 Question : ${QuestionResult[0].insertId}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createQuestion Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteQuestion = async function(questionId){
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const questionIdResult = await questionDao.deleteQuestion(connection, questionId);
        console.log(`삭제된 QuestionId : ${questionIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteQuestion Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};