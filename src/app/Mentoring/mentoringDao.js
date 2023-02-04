  // 멘토 구인글 전체 조회
async function selectPickMentor(connection) {
  const selectPickMentorListQuery = `
                    SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
                    FROM pick 
                    WHERE role = 2
                    order by pickMenteeId desc;
                `;
  const [pickMentorRows] = await connection.query(selectPickMentorListQuery);
  return pickMentorRows;
}


  // 멘티 구인글 전체 조회
  async function selectPickMentee(connection) {
    const selectPickMenteeListQuery = `
                    SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
                    FROM pick 
                    WHERE role = 1
                    order by pickMenteeId desc;
                  `;
    const [pickMenteeRows] = await connection.query(selectPickMenteeListQuery);
    return pickMenteeRows;
  }

    // 멘토 구인글 부분 조회(5개)
   async function selectPickMentorMain(connection) {
    const selectPickMentorMainListQuery = `
                      SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
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
                      SELECT pickId, title, subject, concat(date_format(periodStart, "%y.%m"), "~", date_format(periodEnd, "%y.%m")) as period, mentoringMethod, menteeGender
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
            INSERT INTO Pick(userId, title, contents, status, area, mentoringMethod, mentorCareer, subject, periodStart, periodEnd, wishGender, role, viewCount)
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
            INSERT INTO Pick(userId, title, contents, status, area, mentoringMethod, menteeLevel, subject, periodStart, periodEnd, wishGender, role, viewCount)
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
                 FROM Pick p, User u 
                 WHERE p.role=2 AND p.pickId=? AND p.userId=u.userId;
                 `;
     const [pickMentorRow] = await connection.query(selectPickMentorIdQuery, pickId);
     return pickMentorRow;
}

    // 특정 멘티 구인글 조회
    async function selectPickMenteeById(connection, pickId) {
      const selectPickMenteeIdQuery = `
                SELECT u.nickname, p.title, p.contents, CASE p.status when 1 THEN '모집중' else '모집완료' END as status, p.mentoringMethod, p.menteeLevel, p.subject, p.periodStart, p.periodEnd, p.wishGender, p.viewCount, date(p.createdAt) as 'createdAt', date(p.updatedAt) as 'updatedAt' 
                FROM Pick p, User u 
                WHERE p.role=1 AND p.pickId=? AND p.userId=u.userId;
                  `;
      const [pickMenteeRow] = await connection.query(selectPickMenteeIdQuery, pickId);
      return pickMenteeRow;
 }

    // 멘토 구인글 조회수 증가
    async function updateViewCount2(connection, pickId) {
      const updateViewCountQuery = `
                UPDATE Pick
                SET viewCount = viewCount + 1
                WHERE pickId=? and role=2
                 `;
      await connection.query(updateViewCountQuery, pickId);
      return;
    }

    // 멘티 구인글 조회수 증가
    async function updateViewCount1(connection, pickId) {
      const updateViewCountQuery = `
                UPDATE Pick
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
    async function updatePickMentors(connection, updatePickMentorsParams) {
      const updatePickMentorIdQuery = `
                  UPDATE pick set title=?, contents=?, area=?, mentoringMethod=?, mentorCareer=?, subject=?, periodStart=?, periodEnd=?, wishGender=?
                  where pickId=?
                  `;
      const [pickMentorRow] = await connection.query(updatePickMentorIdQuery, updatePickMentorsParams);
      return pickMentorRow;
 }

    // 멘토 구인글 삭제
    async function deletePickMentor(connection, pickId) {
      const deletePickMentorQuery = `
                    DELETE FROM Pick
                    WHERE pickId = ?;
                    `;
      const deletePickMentorRows = await connection.query(deletePickMentorQuery, pickId);
      return deletePickMentorRows;
    }

    // 멘티 구인글 삭제
    async function deletePickMentee(connection, pickId) {
      const deletePickMenteeQuery = `
                    DELETE FROM Pick
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
      SELECT pickCommentId, pickId, nickname, contents
      FROM pickcomment
      JOIN user ON pickcomment.userId=user.userId and pickId = ?;
  `
  const [mentorComRows] = await connection.query(selectMentorComQuery, pickId);
  return mentorComRows;
}

// 멘토 구인글 댓글 수정
async function updateMentorsCom(connection, updateMentorsComParams){
  const updateMentorsComQuery = `
      UPDATE pickcomment
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
      DELETE FROM pickcomment
      WHERE pickId = ? and pickCommentId = ?;
  `
  const deleteMentorsComRow = await connection.query(
      deleteMentorsComQuery,
      deleteMentorsComParams
  );

  return deleteMentorsComRow

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
    deletePickMentor,
    deletePickMentee,
    insertMentorsCom,
    selectUserRole,
    selectMentorCom,
    updateMentorsCom,
    deleteMentorsCom,
    updateViewCount1,
    updateViewCount2,
    selectPickUser
  };
  