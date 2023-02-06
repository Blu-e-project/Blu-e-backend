const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const reviewDao = require("./reviewDao");

// Provider: Read 비즈니스 로직 처리

//특정 유저가 쓴 리뷰 목록 조회
exports.retrieveReviewList = async function (userId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const reviewListResult = await reviewDao.selectReviewUserId(connection, userId);
    connection.release();

    return reviewListResult;
};

//내가 쓴 리뷰 목록 조회
exports.retrieveMyReviewList = async function (userId) {

    const connection = await pool.getConnection(async (conn) => conn);
    const reviewListResult = await reviewDao.selectReviewByMe(connection, userId);
    connection.release();

    return reviewListResult;
};


// exports.retrieveReview = async function (userId) {
//     const connection = await pool.getConnection(async (conn) => conn);
//     const reviewResult = await reviewDao.selectReviewUserId(connection, userId);
  
//     connection.release();
  
//     return reviewResult[0];
//   };