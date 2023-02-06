const { POSTPICK_SUBJECT_LENGTH } = require("../../../config/baseResponseStatus");

// 리뷰 생성
async function insertReview(connection, userId, nickname, subject, contents) {
  const insertReviewQuery = `
          INSERT INTO review(userId, matchingId, subject, contents)
          VALUES (${userId},
          (SELECT matchingId FROM matching
          WHERE (subject = "${subject}") AND ((userId= ${userId} and targetId = (select userId from user where nickname = "${nickname}")) OR (userId = (select userId from user where nickname = "${nickname}") AND targetId=${userId}))), 
          "${subject}", "${contents}");
      `;
  const insertReviewRow = await connection.query(
    insertReviewQuery,
    userId, nickname, subject, contents
  );

  return insertReviewRow;
}

// userId로 내가 쓴 리뷰 조회
async function selectReviewByMe(connection, userId) {
  const selectReviewByMeQuery = `
                SELECT reviewId, review.matchingId, nickname, contents
                FROM review
                JOIN user ON review.userId=user.userId and review.userId = ?;
                 `;
  const [reviewRow] = await connection.query(selectReviewByMeQuery, userId);
  return reviewRow;
}

// // userId로 나에 대한 리뷰 조회
// async function selectReviewAboutMe(connection, userId) {
//   const selectReviewAboutMeQuery = `
//                   SELECT reviewId, r.matchingId, (select nickname from user where userId = r.userId) as nickname, contents
//                   FROM review as r
//                   JOIN matching as m ON (r.matchingId=m.matchingId) and ((m.userId=r.userId AND m.targetId=${userId}) OR (m.userId=${userId} AND m.targetId=r.userId));
//                    `;
//   const [reviewRow] = await connection.query(selectReviewAboutMeQuery, userId);
//   return reviewRow;
// }

// userId로 특정 유저에 대한 리뷰 조회//
async function selectReviewUserId(connection, userId) {
  const selectReviewUserIdQuery = `
                  SELECT reviewId, r.matchingId, (select nickname from user where userId = r.userId) as nickname, contents
                  FROM review as r
                  JOIN matching as m ON (r.matchingId=m.matchingId) and ((m.userId=r.userId AND m.targetId=${userId}) OR (m.userId=${userId} AND m.targetId=r.userId))
                  ORDER BY reviewId;
                   `;
  const [reviewRow] = await connection.query(selectReviewUserIdQuery, userId);
  return reviewRow;
}
// 리뷰 수정
async function updateReview(connection, updateReviewParams) {
  const updateReviewQuery = `
                        UPDATE review
                        SET contents = ?
                        WHERE reviewId = ?;
                        `;

  const updateReviewRow = await connection.query(
    updateReviewQuery,
    updateReviewParams
  );
  return updateReviewRow;
}

//리뷰 삭제
async function deleteReview(connection, reviewId) {
  const deleteReviewQuery = `
                DELETE FROM review 
                WHERE reviewId = ?;
                `;
  const deleteReviewRows = await connection.query(deleteReviewQuery, reviewId);
  return deleteReviewRows;
}

module.exports = {
  insertReview,
  // selectReview,
  selectReviewByMe,
  // selectReviewAboutMe,
  selectReviewUserId,
  updateReview,
  deleteReview,
};
