  // 멘토 구인글 전체 조회
async function selectPickMentor(connection) {
  const selectPickMentorListQuery = `
                    SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, wishGender
                    FROM pick 
                    WHERE role = 2
                    order by pickId desc;
                `;
  const [pickMentorRows] = await connection.query(selectPickMentorListQuery);
  return pickMentorRows;
}


  // 멘티 구인글 전체 조회
  async function selectPickMentee(connection) {
    const selectPickMenteeListQuery = `
                    SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, wishGender
                    FROM pick 
                    WHERE role = 1
                    order by pickId desc;
                  `;
    const [pickMenteeRows] = await connection.query(selectPickMenteeListQuery);
    return pickMenteeRows;
  }

    // 멘토 구인글 부분 조회(5개)
   async function selectPickMentorMain(connection) {
    const selectPickMentorMainListQuery = `
                      SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, wishGender
                      FROM pick
                      WHERE role = 2
                      ORDER BY viewCount desc
                      LIMIT 5;
                  `;
    const [pickMentorMainRows] = await connection.query(selectPickMentorMainListQuery);
    return pickMentorMainRows;
  }
  
  
    // 멘티 구인글 부분 조회(5개)
    async function selectPickMenteeMain(connection) {
      const selectPickMenteeMainListQuery = `
                      SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, wishGender
                      FROM pick 
                      WHERE role = 1
                      ORDER BY viewCount desc
                      LIMIT 5;
                    `;
      const [pickMenteeMainRows] = await connection.query(selectPickMenteeMainListQuery);
      return pickMenteeMainRows;
    }


    // 멘토 구인글 작성
    async function insertPickMentors(connection, insertPickMentorsParams) {
      const insertPickMentorsQuery = `
            INSERT INTO pick(userId, title, contents, status, area, mentoringMethod, mentorCareer, subject, periodStart, periodEnd, wishGender, role, viewCount)
            VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, 2, 0);
        `;
      const insertPickMentorsRows = await connection.query(
        insertPickMentorsQuery,
        insertPickMentorsParams
      );
    
      return insertPickMentorsRows;
    }

    // 멘티 구인글 작성
    async function insertPickMentees(connection, insertPickMenteesParams) {
      const insertPickMenteesQuery = `
            INSERT INTO pick(userId, title, contents, status, area, mentoringMethod, menteeLevel, subject, periodStart, periodEnd, wishGender, role, viewCount)
            VALUES (?, ?, ?, 1, ?, ?, ?, ?, ?, ?, ?, 1, 0);
        `;
      const insertPickMenteesRows = await connection.query(
        insertPickMenteesQuery,
        insertPickMenteesParams
      );
    
      return insertPickMenteesRows;
    }


    // 특정 멘토 구인글 조회
   async function selectPickMentorById(connection, pickId) {
     const selectPickMentorIdQuery = `
                 SELECT u.nickname, p.title, p.contents, CASE p.status when 1 THEN '모집중' else '모집완료' END as status, p.mentoringMethod, p.mentorCareer, p.subject, p.periodStart, p.periodEnd, p.wishGender, p.viewCount, date(p.createdAt) as 'createdAt', date(p.updatedAt) as 'updatedAt' 
                 FROM pick p, user u 
                 WHERE p.role=2 AND p.pickId=? AND p.userId=u.userId;
                 `;
     const [pickMentorRow] = await connection.query(selectPickMentorIdQuery, pickId);
     return pickMentorRow;
}

    // 특정 멘티 구인글 조회
    async function selectPickMenteeById(connection, pickId) {
      const selectPickMenteeIdQuery = `
                SELECT u.nickname, p.title, p.contents, CASE p.status when 1 THEN '모집중' else '모집완료' END as status, p.mentoringMethod, p.menteeLevel, p.subject, p.periodStart, p.periodEnd, p.wishGender, p.viewCount, date(p.createdAt) as 'createdAt', date(p.updatedAt) as 'updatedAt' 
                FROM pick p, user u 
                WHERE p.role=1 AND p.pickId=? AND p.userId=u.userId;
                  `;
      const [pickMenteeRow] = await connection.query(selectPickMenteeIdQuery, pickId);
      return pickMenteeRow;
 }

    // 멘토 구인글 조회수 증가
    async function updateViewCount2(connection, pickId) {
      const updateViewCountQuery = `
                UPDATE pick
                SET viewCount = viewCount + 1
                WHERE pickId=? and role=2
                 `;
      await connection.query(updateViewCountQuery, pickId);
      return;
    }

    // 멘티 구인글 조회수 증가
    async function updateViewCount1(connection, pickId) {
      const updateViewCountQuery = `
                UPDATE pick
                SET viewCount = viewCount + 1
                WHERE pickId=? and role=1
                 `;
      await connection.query(updateViewCountQuery, pickId);
      return;
    }

    // 구인글 게시자 확인(권한 확인)
    async function selectPickUser(connection, pickId){
      const selectPickUserQuery = `
                      SELECT userId
                      FROM pick
                      WHERE pickId = ?;
      `
      const [roleRows] = await connection.query(selectPickUserQuery, pickId);
      return roleRows;
    }
    

    // 멘토 구인글 수정
    async function updatePickMentors(connection, patchPickMentorsParams) {
      const updatePickMentorIdQuery = `
                  UPDATE pick 
                  SET title=?, contents=?, area=?, mentoringMethod=?, mentorCareer=?, subject=?, periodStart=?, periodEnd=?, wishGender=?
                  WHERE pickId=? and role=2;
                  `;
      const [pickMentorRow] = await connection.query(updatePickMentorIdQuery, patchPickMentorsParams);
      return pickMentorRow;
 }

     // 멘티 구인글 수정
     async function updatePickMentees(connection, patchPickMenteesParams) {
      const updatePickMenteeIdQuery = `
                  UPDATE pick 
                  SET title=?, contents=?, area=?, mentoringMethod=?, menteeLevel=?, subject=?, periodStart=?, periodEnd=?, wishGender=?
                  WHERE pickId=? and role=1;
                  `;
      const [pickMenteeRow] = await connection.query(updatePickMenteeIdQuery, patchPickMenteesParams);
      return pickMenteeRow;
 }

    // 멘토 구인글 삭제
    async function deletePickMentor(connection, pickId) {
      const deletePickMentorQuery = `
                    DELETE FROM pick
                    WHERE pickId = ?;
                    `;
      const deletePickMentorRows = await connection.query(deletePickMentorQuery, pickId);
      return deletePickMentorRows;
    }

    // 멘티 구인글 삭제
    async function deletePickMentee(connection, pickId) {
      const deletePickMenteeQuery = `
                    DELETE FROM pick
                    WHERE pickId = ?;
                    `;
      const deletePickMenteeRows = await connection.query(deletePickMenteeQuery, pickId);
      return deletePickMenteeRows;
    }
    

// 멘토 구인글에 댓글 생성
async function insertMentorsCom(connection, insertMentorsComParams){
  const insertMentorsComQuery = `
      INSERT INTO pickComment(userId, pickId, role, contents)
      VALUES (?, ?, ?, ?);
  `;
  const insertMentorsComRow = await connection.query(
      insertMentorsComQuery,
      insertMentorsComParams
  );

  return insertMentorsComRow;
}

// 유저 role 조회
async function selectUserRole(connection, userId){
  const selectUserRoleQuery = `
                  SELECT userId, id, role
                  FROM user
                  WHERE userId = ?;
  `
  const [roleRows] = await connection.query(selectUserRoleQuery, userId);
  return roleRows;
}

// 멘토 구인글에 달린 댓글 조회
async function selectMentorCom(connection, pickId) {
  const selectMentorComQuery = `
    SELECT user.nickname, pickComment.contents, user.userImg, pickComment.createdAt
    FROM pickComment
    JOIN user ON pickComment.userId=user.userId and pickId = ?;
  `
  const [mentorComRows] = await connection.query(selectMentorComQuery, pickId);
  return mentorComRows;
}

// 멘토 구인글 댓글 수정
async function updateMentorsCom(connection, updateMentorsComParams){
  const updateMentorsComQuery = `
      UPDATE pickComment
      SET contents = ?
      WHERE pickId = ? and pickCommentId = ?;
  `
  const updateMentorsComRow = await connection.query(
      updateMentorsComQuery,
      updateMentorsComParams
  )
  return updateMentorsComRow
}

// 멘토 구인글 댓글 삭제
async function deleteMentorsCom(connection, deleteMentorsComParams){
  const deleteMentorsComQuery = `
      DELETE FROM pickComment
      WHERE pickId = ? and pickCommentId = ?;
  `
  const deleteMentorsComRow = await connection.query(
      deleteMentorsComQuery,
      deleteMentorsComParams
  );

  return deleteMentorsComRow

}

// userId로 이미 댓글 달았는지 확인
async function selectPickComByUserId(connection, pickCommentId) {
  const selectPickComUserQuery = `
                    SELECT userId, contents
                    FROM pickComment
                    WHERE userId = ? AND pickId= ?;
    `
    const [roleRows] = await connection.query(selectPickComUserQuery, pickCommentId);
    return roleRows;
}

// 멘토 구인글에 댓글 생성
async function insertMenteesCom(connection, insertMenteesComParams){
  const insertMenteesComQuery = `
      INSERT INTO pickComment(userId, pickId, role, contents)
      VALUES (?, ?, ?, ?);
  `;
  const insertMenteesComRow = await connection.query(
      insertMenteesComQuery,
      insertMenteesComParams
  );

  return insertMenteesComRow;
}

// 멘티 구인글에 달린 댓글 조회
async function selectMenteeCom(connection, pickId) {
  const selectMenteeComQuery = `
      SELECT user.nickname, pickComment.contents, user.userImg, pickComment.createdAt
      FROM pickComment
      JOIN user ON pickComment.userId=user.userId and pickId = ?;
  `
  const [menteeComRows] = await connection.query(selectMenteeComQuery, pickId);
  return menteeComRows;
}

// 멘티 구인글 댓글 수정
async function updateMenteesCom(connection, updateMenteesComParams){
  const updateMenteesComQuery = `
      UPDATE pickComment
      SET contents = ?
      WHERE pickId = ? and pickCommentId = ?;
  `
  const updateMenteesComRow = await connection.query(
      updateMenteesComQuery,
      updateMenteesComParams
  )
  return updateMenteesComRow
}

// 멘티 구인글 댓글 삭제
async function deleteMenteesCom(connection, deleteMenteesComParams){
  const deleteMenteesComQuery = `
      DELETE FROM pickComment
      WHERE pickId = ? and pickCommentId = ?;
  `
  const deleteMenteesComRow = await connection.query(
      deleteMenteesComQuery,
      deleteMenteesComParams
  );

  return deleteMenteesComRow

}

// 댓글 작성자와 userId가 맞는지 확인
async function selectPickComUser(connection, pickCommentId) {
  const selectPickComUserQuery = `
                    SELECT userId
                    FROM pickComment
                    WHERE pickCommentId = ?;
    `
    const [roleRows] = await connection.query(selectPickComUserQuery, pickCommentId);
    return roleRows;
}

// 댓글 작성자와 userId가 맞는지 확인
async function pickStatusCheck(connection, pickId) {
  const pickStatusCheckQuery = `
                    SELECT pickId, status
                    FROM pick
                    WHERE pickId = ?;
    `
    const [pickRows] = await connection.query(pickStatusCheckQuery, pickId);
    return pickRows;
}

async function insertMatching(connection, userId, pickId, pickCommentId){
  const insertMatchingQuery = `
      INSERT INTO matching(userId, targetId, subject)
      VALUES (${userId},
      (SELECT userId
        FROM pickComment
        WHERE pickCommentId=${pickCommentId}),
      (SELECT subject
        FROM pick
        WHERE pickId=${pickId})
      );
    `
    const [matchingRows] = await connection.query(insertMatchingQuery, userId, pickId, pickCommentId);
    return matchingRows;
}

async function updateStatus(connection, pickId){
  const updateStatusQuery = `
          UPDATE pick
          SET status = 0
          WHERE pickId = ?;
        `
    const statusRow = await connection.query(updateStatusQuery, pickId);
    return statusRow;
}

// 매칭된 사람 댓글만 보여지게 하기
// 매칭 테이블은 matchingId, userId, targetId만 있음
// 알 수 있는 건 userId와 파라미터로 넘어오는 pickId
async function selectMatchingCom(connection, pickId){
  const selectMatchingComQuery = `
        SELECT user.nickname, user.userImg, pickComment.contents, pickComment.updatedAt
        FROM pickComment
        JOIN user ON user.userId = pickComment.userId
        WHERE pickComment.userId = (
        SELECT targetId
        FROM matching
        JOIN pick ON pick.userId = matching.userId
        JOIN pickComment on pickComment.pickId=${pickId} AND pickComment.userId=matching.targetId)
        `
    const matchingCom = await connection.query(selectMatchingComQuery, pickId);
    return matchingCom;
}

async function userIdCheck(connection, pickId){
  const userIdCheckQuery = `
          SELECT userId
          FROM pick
          WHERE pickId = ?;
        `
    const userIdCheckRow = await connection.query(userIdCheckQuery, pickId);
    return userIdCheckRow;
}

// 매칭테이블에서의 userId와 로그인한 사용자의 userId가 같은지 확인
async function matchingCheck(connection, pickId){
  const userIdCheckQuery = `
          SELECT exists(
            SELECT p.userId
            FROM pick p, matching m, pickComment c
            WHERE p.pickId=${pickId} AND p.subject=m.subject AND m.targetId=c.userId AND c.pickId=${pickId}
          ) as matchingCheck;
          `
    const userIdCheckRow = await connection.query(userIdCheckQuery, pickId);
    return userIdCheckRow;
}


  module.exports = {
    selectPickMentee,
    selectPickMentor,
    selectPickMentorMain,
    selectPickMenteeMain,
    insertPickMentors,
    insertPickMentees,
    selectPickMentorById,
    selectPickMenteeById,
    updatePickMentors,
    updatePickMentees,
    deletePickMentor,
    deletePickMentee,
    insertMentorsCom,
    selectUserRole,
    selectMentorCom,
    updateMentorsCom,
    deleteMentorsCom,
    updateViewCount1,
    updateViewCount2,
    selectPickUser,
    selectPickComByUserId,
    insertMenteesCom,
    selectMenteeCom,
    selectPickComUser,
    updateMenteesCom,
    deleteMenteesCom,
    pickStatusCheck,
    insertMatching,
    updateStatus,
    selectMatchingCom,
    userIdCheck,
    matchingCheck
  };
  