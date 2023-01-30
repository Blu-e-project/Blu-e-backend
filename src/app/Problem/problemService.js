const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const problemProvider = require("./problemProvider");
const problemDao = require("./problemDao");
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
        // console.log(`추가된 문제 : ${problemIdResult[0]}`)
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

exports.createSolution = async function (userId, problemId, contents) {
    try {

        const insertSolutionParams = [userId, problemId, contents];

        const connection = await pool.getConnection(async (conn) => conn);

        const solutionIdResult = await problemDao.insertSolution(connection, insertSolutionParams);
        console.log(`추가된 답변 : ${solutionIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createSolution Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.updateSolution = async function (contents, problemId, solutionId) {
    try {
        const updateSolutionParams = [contents, problemId, solutionId];
        const connection = await pool.getConnection(async (conn) => conn);

        const solutionIdResult = await problemDao.updateSolution(connection, updateSolutionParams);
        console.log(`수정된 답변 : ${solutionIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - updateSolution Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

exports.deleteSolution = async function(problemId, solutionId){
    try {
        const deleteSolutionParams = [problemId, solutionId];
        const connection = await pool.getConnection(async (conn) => conn);
        const solutionIdResult = await problemDao.deleteSolution(connection, deleteSolutionParams);
        // console.log(`삭제된 문제 : ${solutionIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteProblem Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};