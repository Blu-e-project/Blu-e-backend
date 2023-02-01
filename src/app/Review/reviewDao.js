  // 리뷰 생성
async function insertReview(connection, insertReviewParams) {
    const insertReviewQuery = `
          INSERT INTO review(userId, matchingId, subject, contents, /*status*/)
          VALUES (?, ?, ?, ?, ?);
      `;//matchingId 알아내기
    const insertReviewRow = await connection.query(
      insertReviewQuery,
      insertReviewParams
    );
  
    return insertReviewRow;
  };

//   //전체 리뷰 조회
// async function selectReview(connection) {
//   const selectReviewListQuery = `

//                 `;
//   const [reviewRows] = await connection.query(selectReviewListQuery);
//   return reviewRows;
// };

  // userId로 리뷰 조회
async function selectReviewUserId(connection, userId) {
  const selectReviewUserIdQuery = `

                 `;
  const [reviewRow] = await connection.query(selectReviewUserIdQuery, userId);
  return reviewRow;
};

  // 리뷰 수정
  async function updateReview(connection, updateReviewParams) {

    const updateReviewQuery = `
                        UPDATE review
                        SET subject = ?, contents = ?
                        WHERE reviewId = ?;
                        `;

    const updateReviewRow = await connection.query(
      updateReviewQuery,
      updateReviewParams
    );
    return updateReviewRow;
};

//리뷰 삭제
async function deleteReview(connection, reviewId) {
  const deleteReviewQuery = `
                DELETE FROM review 
                WHERE reviewId = ?;
                `;
  const deleteReviewRows = await connection.query(deleteReviewQuery, reviewId);
  return deleteReviewRows;
};


module.exports = {
  insertReview,
  // selectReview,
  selectReviewUserId,
  updateReview,
  deleteReview
};