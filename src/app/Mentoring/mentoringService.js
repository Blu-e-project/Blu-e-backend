const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const mentoringProvider = require("./mentoringProvider");
const mentoringDao = require("./mentoringDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// const jwt = require("jsonwebtoken");


// Service: Create, Update, Delete 비즈니스 로직 처리

exports.createProblem = async function (userId, subject, unit, problem, contents, image) {
    try {

        const insertProblemParams = [userId, subject, unit, problem, contents, image];

        const connection = await pool.getConnection(async (conn) => conn);

        const problemIdResult = await problemDao.insertProblem(connection, insertProblemParams);
        console.log(`추가된 문제 : ${problemIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createProblem Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteProblem = async function(problemId){
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const problemIdResult = await problemDao.deleteProblem(connection, problemId);
        console.log(`삭제된 문제 : ${problemIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteProblem Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.createPickMentors = async function (userId, title, contents, area, mentoringMethod, mentorCareer, subject, periodStart, periodEnd, wishGender) {
    try {

        const insertPickMentorsParams = [userId, title, contents, area, mentoringMethod, mentorCareer, subject, periodStart, periodEnd, wishGender];

        const connection = await pool.getConnection(async (conn) => conn);

        const pickIdResult = await mentoringDao.insertPickMentors(connection, insertPickMentorsParams);
        console.log(`추가된 구인글 : ${pickIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createPick Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};


exports.createPickMentees = async function (userId, title, contents, area, mentoringMethod, menteeLevel, subject, periodStart, periodEnd, wishGender) {
    try {

        const insertPickMenteesParams = [userId, title, contents, area, mentoringMethod, menteeLevel, subject, periodStart, periodEnd, wishGender];

        const connection = await pool.getConnection(async (conn) => conn);

        const pickIdResult = await mentoringDao.insertPickMentees(connection, insertPickMenteesParams);
        console.log(`추가된 구인글 : ${pickIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createPick Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.createMentorsCom = async function (userId, pickId, contents){
    try {
        const roleRows = await mentoringProvider.roleCheck(userId);

        console.log(roleRows[0], roleRows[0].role)
        const role = roleRows[0].role
        const insertMentorsComParams = [userId, pickId, role, contents];

        const connection = await pool.getConnection(async (conn) => conn);
        const mentorComIdResult = await mentoringDao.insertMentorsCom(connection,insertMentorsComParams);
        console.log(`추가된 댓글 : ${mentorComIdResult[0]}`)
        connection.release();

        return response(baseResponse.SUCCESS);
    } catch(err){
        logger.error(`App - createComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }

}

exports.updateMentorsCom= async function(contents, pickId, pickCommentId){
    try{
        const updateMentorsComParams = [contents, pickId, pickCommentId]
        const connection = await pool.getConnection(async (conn) => conn);
        const mentorComIdResult = await mentoringDao.updateMentorsCom(connection,updateMentorsComParams);
        console.log(`수정된 댓글 : ${mentorComIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch(err){
        logger.error(`App - updateComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}

exports.deleteMentorsCom = async function(pickId, pickCommentId){
    try{
        const deleteMentorsComParams = [pickId, pickCommentId]
        const connection = await pool.getConnection(async (conn) => conn);
        const mentorComIdResult = await mentoringDao.deleteMentorsCom(connection,deleteMentorsComParams);
        console.log(`삭제된 댓글 : ${mentorComIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);
    } catch(err) {
        logger.error(`App - deleteComment Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}