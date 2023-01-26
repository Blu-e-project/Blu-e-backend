const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const questionDao = require("./questionDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveQuestion = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const questionListResult = await questionDao.selectQuestion(connection, userId);
  
    connection.release();
  
    return questionListResult;
  };



exports.retrieveQuestionNeedingAnswer = async function () {
    const connection = await pool.getConnection(async (conn) => conn);
    const QuestionNeedingAnswerListResult = await questionDao.selectQuestionNeedingAnswer(connection);
  
    connection.release();
  
    return QuestionNeedingAnswerListResult;
  };