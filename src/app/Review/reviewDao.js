const { POSTPICK_SUBJECT_LENGTH } = require("../../../config/baseResponseStatus");

// 존재하는 닉네임인지 확인

async function nicknameCheck(connection, nickname) {
  const nicknameCheckQuery = `
            SELECT exists
            (SELECT userId
            FROM user
            WHERE nickname = ?) as nicknameCheck;
          `;

  const [nicknameCheckRow] = await connection.query(
    nicknameCheckQuery,
    nickname
  );

  return nicknameCheckRow;
  
};

// 존재하는 매칭인지 확인
async function matchingCheck(connection, userId, nickname, subject) {
  const matchingCheckQuery = `
          SELECT exists(
            SELECT matchingId
            FROM matching
            WHERE (subject = '${subject}') AND ((userId = ${userId} AND targetId = (select userId from user where nickname = '${nickname}')) OR (userId = (select userId from user where nickname = '${nickname}') AND targetId = ${userId}))
          ) as matchingCheck;
          `;

  const [matchingCheckRow] = await connection.query(
    matchingCheckQuery,
    userId, nickname, subject
  );

  return matchingCheckRow;
  
};

//리뷰 작성여부 확인
async function reviewCheck(connection, userId, nickname) {
  const reviewCheckQuery = `
          SELECT exists(
            SELECT reviewId 
            FROM review as r
            JOIN matching as m
            ON (m.matchingId = r.matchingId) AND ((m.userId=${userId} AND m.targetId = (SELECT userId from user where nickname = "${nickname}")) OR (m.userId = (SELECT userId from user where nickname = "${nickname}") AND m.targetId = ${userId}))
          ) as reviewCheck;
          `;

  const [reviewCheckRow] = await connection.query(
    reviewCheckQuery,
    userId, nickname
  );
        
  return reviewCheckRow;
};

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
                SELECT reviewId, r.matchingId,
                CASE WHEN m.userId = ${userId} THEN (SELECT userImg from user where userId=m.targetId)  else (select userImg from user where userId = m.userId) END as userImg, 
                CASE WHEN m.userId = ${userId} THEN (SELECT nickname from user where userId=m.targetId)  else (select nickname from user where userId = m.userId) END as nickname, contents
                FROM review r, user u, matching m
                WHERE r.userId=u.userId and r.matchingId = m.matchingId and r.userId = ${userId};
                 `;
  const [reviewRow] = await connection.query(selectReviewByMeQuery, userId);
  return reviewRow;
};
// userId로 특정 유저에 대한 리뷰 조회//
async function selectReviewUserId(connection, userId) {
  const selectReviewUserIdQuery = `
                  SELECT reviewId, r.matchingId, (select userImg from user where userId = r.userId) as userImg, (select nickname from user where userId = r.userId) as nickname, contents
                  FROM review as r
                  JOIN matching as m 
                  ON (r.matchingId=m.matchingId) and ((m.userId=r.userId AND m.targetId=${userId}) OR (m.userId=${userId} AND m.targetId=r.userId))
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
  reviewCheck,
  nicknameCheck,
  matchingCheck,
  insertReview,
  selectReviewByMe,
  selectReviewUserId,
  updateReview,
  deleteReview,
};
