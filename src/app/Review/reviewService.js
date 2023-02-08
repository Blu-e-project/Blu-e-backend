const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const reviewDao = require("./reviewDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
// const jwt = require("jsonwebtoken");
// const reviewProvider = require("./reviewProvider");

// Service: Create, Update, Delete 비즈니스 로직 처리


//리뷰생성
exports.createReview = async function (userId, nickname, subject, contents) {
    try {

        const insertReviewParams = [userId, nickname, subject, contents];

        const connection = await pool.getConnection(async (conn) => conn);

        const reviewIdResult = await reviewDao.insertReview(connection, userId, nickname, subject, contents);
        // console.log(`추가된 리뷰 : ${reviewIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - createReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//리뷰수정
exports.updateReview = async function (contents, reviewId) {
    try {
        const updateReviewParams = [contents, reviewId];
        const connection = await pool.getConnection(async (conn) => conn);

        const reviewIdResult = await reviewDao.updateReview(connection, updateReviewParams);
        // console.log(`수정된 리뷰 : ${reviewIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);


    } catch (err) {
        logger.error(`App - updateReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};

//리뷰삭제
exports.deleteReview = async function(reviewId){
    try {
        const connection = await pool.getConnection(async (conn) => conn);
        const reviewIdResult = await reviewDao.deleteReview(connection, reviewId);
        console.log(`삭제된 리뷰 : ${reviewIdResult[0]}`)
        connection.release();
        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - deleteReview Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
};