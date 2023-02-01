const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const reviewDao = require("./reviewDao");

// Provider: Read 비즈니스 로직 처리

// exports.retrieveReviewList = async function () {

//     const connection = await pool.getConnection(async (conn) => conn);
//     const reviewListResult = await reviewDao.selectReview(connection);
//     connection.release();

//     return reviewListResult;
// };

exports.retrieveReview = async function (userId) {
    const connection = await pool.getConnection(async (conn) => conn);
    const reviewResult = await reviewDao.selectReviewUserId(connection, userId);
  
    connection.release();
  
    return reviewResult[0];
  };