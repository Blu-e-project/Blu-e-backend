const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const reviewDao = require("./reviewDao");

// Provider: Read 비즈니스 로직 처리

//작성된 리뷰인지 확인
exports.reviewCheck = async function (userId, nickname) {

    const connection = await pool.getConnection(async (conn) => conn);
    const reviewCheckResult = await reviewDao.reviewCheck(connection, userId, nickname);
    connection.release();

    return reviewCheckResult;
};

//존재하는 닉네임인지 확인
exports.nicknameCheck = async function (nickname) {

    const connection = await pool.getConnection(async (conn) => conn);
    const nicknameCheckResult = await reviewDao.nicknameCheck(connection,nickname);
    connection.release();

    return nicknameCheckResult;
};

//존재하는 매칭인지 확인
exports.matchingCheck = async function (userId, nickname, subject) {

    const connection = await pool.getConnection(async (conn) => conn);
    const matchingheckResult = await reviewDao.matchingCheck(connection,userId, nickname, subject);
    connection.release();

    return matchingheckResult;
};
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